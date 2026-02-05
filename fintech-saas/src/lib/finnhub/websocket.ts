/**
 * Finnhub WebSocket Manager
 * 
 * Real-time streaming for:
 * - U.S. stocks
 * - Forex pairs
 * - Crypto pairs
 * 
 * Limits:
 * - Up to 50 symbols per connection
 * 
 * @see Finnhub API Free Tier Capabilities (2026).docx.md
 */

type TradeData = {
    s: string;  // Symbol
    p: number;  // Last price
    t: number;  // Timestamp
    v: number;  // Volume
    c: string[]; // Trade conditions
};

type WebSocketMessage = {
    type: 'trade' | 'ping' | 'error';
    data?: TradeData[];
    msg?: string;
};

type SubscriptionCallback = (data: TradeData) => void;

class FinnhubWebSocket {
    private ws: WebSocket | null = null;
    private apiKey: string;
    private subscriptions: Map<string, Set<SubscriptionCallback>> = new Map();
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectDelay = 1000;
    private pendingSubscriptions: string[] = [];
    private connectionPromise: Promise<void> | null = null;

    constructor(apiKey: string = process.env.NEXT_PUBLIC_FINNHUB_API_KEY || '') {
        this.apiKey = apiKey;
        if (typeof window !== 'undefined') {
            (window as any).finnhubWS = this;
        }
    }

    /**
     * Connect to the WebSocket server
     */
    connect(): Promise<void> {
        if (this.connectionPromise) {
            return this.connectionPromise;
        }

        if (this.ws?.readyState === WebSocket.OPEN) {
            return Promise.resolve();
        }

        this.connectionPromise = new Promise((resolve, reject) => {
            try {
                if (typeof window === 'undefined') {
                    resolve();
                    return;
                }

                console.log('[Finnhub WS] Connecting...');
                const wsUrl = `wss://ws.finnhub.io?token=${this.apiKey}`;
                this.ws = new WebSocket(wsUrl);

                this.ws.onopen = () => {
                    console.log('[Finnhub WS] Connected');
                    this.reconnectAttempts = 0;
                    this.connectionPromise = null;

                    // Resubscribe to pending symbols
                    const symbols = [...this.pendingSubscriptions];
                    this.pendingSubscriptions = [];
                    symbols.forEach(symbol => this.sendSubscribe(symbol));

                    resolve();
                };

                this.ws.onclose = () => {
                    console.log('[Finnhub WS] Disconnected');
                    this.connectionPromise = null;
                    this.handleReconnect();
                };

                this.ws.onerror = (error) => {
                    console.error('[Finnhub WS] Error:', error);
                    this.connectionPromise = null;
                    reject(error);
                };

                this.ws.onmessage = (event) => {
                    this.handleMessage(event.data);
                };
            } catch (error) {
                this.connectionPromise = null;
                reject(error);
            }
        });

        return this.connectionPromise;
    }

    /**
     * Handle incoming WebSocket messages
     */
    private handleMessage(data: string) {
        try {
            const message: WebSocketMessage = JSON.parse(data);

            if (message.type === 'trade' && message.data) {
                message.data.forEach((trade) => {
                    const callbacks = this.subscriptions.get(trade.s);
                    if (callbacks) {
                        callbacks.forEach(callback => callback(trade));
                    }
                });
            } else if (message.type === 'ping') {
                // Heartbeat - connection is alive
            } else if (message.type === 'error') {
                console.error('[Finnhub WS] Server error:', message.msg);
            }
        } catch (error) {
            console.error('[Finnhub WS] Failed to parse message:', error);
        }
    }

    /**
     * Handle reconnection with exponential backoff
     */
    private handleReconnect() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('[Finnhub WS] Max reconnection attempts reached');
            return;
        }

        const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts);
        this.reconnectAttempts++;

        console.log(`[Finnhub WS] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);

        // Save current subscriptions for resubscription
        this.pendingSubscriptions = Array.from(this.subscriptions.keys());

        setTimeout(() => {
            this.connect().catch(console.error);
        }, delay);
    }

    /**
     * Send subscribe message
     */
    private sendSubscribe(symbol: string) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            try {
                this.ws.send(JSON.stringify({ type: 'subscribe', symbol }));
            } catch (err) {
                console.error('[Finnhub WS] Failed to send subscribe:', err);
            }
        } else {
            if (!this.pendingSubscriptions.includes(symbol)) {
                this.pendingSubscriptions.push(symbol);
            }
        }
    }

    /**
     * Send unsubscribe message
     */
    private sendUnsubscribe(symbol: string) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            try {
                this.ws.send(JSON.stringify({ type: 'unsubscribe', symbol }));
            } catch (err) {
                console.error('[Finnhub WS] Failed to send unsubscribe:', err);
            }
        }
    }

    /**
     * Subscribe to a symbol's trades
     * 
     * @param symbol - Stock symbol (e.g., 'AAPL'), forex pair (e.g., 'OANDA:EUR_USD'), or crypto (e.g., 'BINANCE:BTCUSDT')
     * @param callback - Function to call when new trade data arrives
     * @returns Unsubscribe function
     */
    subscribe(symbol: string, callback: SubscriptionCallback): () => void {
        if (!this.subscriptions.has(symbol)) {
            this.subscriptions.set(symbol, new Set());

            if (this.ws?.readyState === WebSocket.OPEN) {
                this.sendSubscribe(symbol);
            } else {
                if (!this.pendingSubscriptions.includes(symbol)) {
                    this.pendingSubscriptions.push(symbol);
                }
            }
        }

        this.subscriptions.get(symbol)!.add(callback);

        // Return unsubscribe function
        return () => {
            const callbacks = this.subscriptions.get(symbol);
            if (callbacks) {
                callbacks.delete(callback);

                // If no more callbacks for this symbol, unsubscribe from server
                if (callbacks.size === 0) {
                    this.subscriptions.delete(symbol);
                    this.sendUnsubscribe(symbol);
                }
            }
        };
    }

    /**
     * Get count of active subscriptions
     */
    getSubscriptionCount(): number {
        return this.subscriptions.size;
    }

    /**
     * Check if connected
     */
    isActive(): boolean {
        return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
    }

    /**
     * Disconnect from WebSocket
     */
    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
            this.isConnected = false;
            this.subscriptions.clear();
        }
    }
}

// Export singleton instance
export const finnhubWS = new FinnhubWebSocket();
export default finnhubWS;
export type { TradeData };

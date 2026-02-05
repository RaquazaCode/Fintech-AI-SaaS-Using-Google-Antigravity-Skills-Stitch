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
    private isConnected = false;
    private pendingSubscriptions: string[] = [];

    constructor(apiKey: string = process.env.NEXT_PUBLIC_FINNHUB_API_KEY || '') {
        this.apiKey = apiKey;
    }

    /**
     * Connect to the WebSocket server
     */
    connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.isConnected && this.ws) {
                resolve();
                return;
            }

            try {
                this.ws = new WebSocket(`wss://ws.finnhub.io?token=${this.apiKey}`);

                this.ws.onopen = () => {
                    console.log('[Finnhub WS] Connected');
                    this.isConnected = true;
                    this.reconnectAttempts = 0;

                    // Resubscribe to pending symbols
                    this.pendingSubscriptions.forEach(symbol => {
                        this.sendSubscribe(symbol);
                    });
                    this.pendingSubscriptions = [];

                    resolve();
                };

                this.ws.onclose = () => {
                    console.log('[Finnhub WS] Disconnected');
                    this.isConnected = false;
                    this.handleReconnect();
                };

                this.ws.onerror = (error) => {
                    console.error('[Finnhub WS] Error:', error);
                    reject(error);
                };

                this.ws.onmessage = (event) => {
                    this.handleMessage(event.data);
                };
            } catch (error) {
                reject(error);
            }
        });
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
        if (this.ws && this.isConnected) {
            this.ws.send(JSON.stringify({ type: 'subscribe', symbol }));
        }
    }

    /**
     * Send unsubscribe message
     */
    private sendUnsubscribe(symbol: string) {
        if (this.ws && this.isConnected) {
            this.ws.send(JSON.stringify({ type: 'unsubscribe', symbol }));
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

            if (this.isConnected) {
                this.sendSubscribe(symbol);
            } else {
                this.pendingSubscriptions.push(symbol);
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
        return this.isConnected;
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

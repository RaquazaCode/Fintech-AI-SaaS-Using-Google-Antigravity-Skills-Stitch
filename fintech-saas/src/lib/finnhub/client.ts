/**
 * Finnhub API Client
 * 
 * Rate limits (Free Tier):
 * - 60 API calls per minute
 * - 30 calls per second
 * 
 * @see Finnhub API Free Tier Capabilities (2026).docx.md
 */

const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY || '';
const BASE_URL = 'https://finnhub.io/api/v1';

interface FetchOptions {
    revalidate?: number;
}

class FinnhubClient {
    private apiKey: string;
    private baseUrl: string;

    constructor(apiKey: string = FINNHUB_API_KEY) {
        this.apiKey = apiKey;
        this.baseUrl = BASE_URL;
    }

    private async fetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
        const url = `${this.baseUrl}${endpoint}${endpoint.includes('?') ? '&' : '?'}token=${this.apiKey}`;

        const response = await fetch(url, {
            next: { revalidate: options.revalidate ?? 60 }, // Cache for 1 minute by default
        });

        if (!response.ok) {
            throw new Error(`Finnhub API error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    /**
     * Get real-time quote for a symbol
     * Endpoint: /quote
     */
    async getQuote(symbol: string) {
        return this.fetch<{
            c: number;  // Current price
            d: number;  // Change
            dp: number; // Percent change
            h: number;  // High price of the day
            l: number;  // Low price of the day
            o: number;  // Open price of the day
            pc: number; // Previous close price
            t: number;  // Timestamp
        }>(`/quote?symbol=${symbol}`);
    }

    /**
     * Get company profile
     * Endpoint: /stock/profile2
     */
    async getCompanyProfile(symbol: string) {
        return this.fetch<{
            country: string;
            currency: string;
            exchange: string;
            finnhubIndustry: string;
            ipo: string;
            logo: string;
            marketCapitalization: number;
            name: string;
            phone: string;
            shareOutstanding: number;
            ticker: string;
            weburl: string;
        }>(`/stock/profile2?symbol=${symbol}`);
    }

    /**
     * Get OHLCV candlestick data
     * Endpoint: /stock/candle
     * 
     * Resolution options: 1, 5, 15, 30, 60, D, W, M
     * Free tier: ~1 year of history per call
     */
    async getCandles(symbol: string, resolution: string, from: number, to: number) {
        return this.fetch<{
            c: number[];  // Close prices
            h: number[];  // High prices
            l: number[];  // Low prices
            o: number[];  // Open prices
            s: string;    // Status
            t: number[];  // Timestamps
            v: number[];  // Volumes
        }>(`/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}`);
    }

    /**
     * Get market news
     * Endpoint: /news
     * 
     * Categories: general, forex, crypto, merger
     */
    async getMarketNews(category: string = 'general') {
        return this.fetch<Array<{
            category: string;
            datetime: number;
            headline: string;
            id: number;
            image: string;
            related: string;
            source: string;
            summary: string;
            url: string;
        }>>(`/news?category=${category}`, { revalidate: 300 }); // Cache news for 5 minutes
    }

    /**
     * Get company news
     * Endpoint: /company-news
     * 
     * Note: 1-year history available for North American companies only
     */
    async getCompanyNews(symbol: string, from: string, to: string) {
        return this.fetch<Array<{
            category: string;
            datetime: number;
            headline: string;
            id: number;
            image: string;
            related: string;
            source: string;
            summary: string;
            url: string;
        }>>(`/company-news?symbol=${symbol}&from=${from}&to=${to}`);
    }

    /**
     * Get basic financials
     * Endpoint: /stock/metric
     */
    async getBasicFinancials(symbol: string) {
        return this.fetch<{
            metric: {
                '10DayAverageTradingVolume': number;
                '52WeekHigh': number;
                '52WeekLow': number;
                '52WeekPriceReturnDaily': number;
                beta: number;
                // ... other metrics
            };
            metricType: string;
            symbol: string;
        }>(`/stock/metric?symbol=${symbol}&metric=all`);
    }

    /**
     * Get social sentiment
     * Endpoint: /stock/social-sentiment
     * 
     * Available for free tier
     */
    async getSocialSentiment(symbol: string, from: string, to: string) {
        return this.fetch<{
            data: Array<{
                atTime: string;
                mention: number;
                positiveScore: number;
                negativeScore: number;
                positiveMention: number;
                negativeMention: number;
                score: number;
            }>;
            symbol: string;
        }>(`/stock/social-sentiment?symbol=${symbol}&from=${from}&to=${to}`);
    }

    /**
     * Get recommendation trends
     * Endpoint: /stock/recommendation
     */
    async getRecommendationTrends(symbol: string) {
        return this.fetch<Array<{
            buy: number;
            hold: number;
            period: string;
            sell: number;
            strongBuy: number;
            strongSell: number;
            symbol: string;
        }>>(`/stock/recommendation?symbol=${symbol}`);
    }

    /**
     * Get earnings calendar
     * Endpoint: /calendar/earnings
     * 
     * Note: 1-month forward calendar available on free tier
     */
    async getEarningsCalendar(from: string, to: string, symbol?: string) {
        const endpoint = symbol
            ? `/calendar/earnings?from=${from}&to=${to}&symbol=${symbol}`
            : `/calendar/earnings?from=${from}&to=${to}`;
        return this.fetch<{
            earningsCalendar: Array<{
                date: string;
                epsActual: number | null;
                epsEstimate: number;
                hour: string;
                quarter: number;
                revenueActual: number | null;
                revenueEstimate: number;
                symbol: string;
                year: number;
            }>;
        }>(endpoint);
    }

    /**
     * Search for symbols
     * Endpoint: /search
     */
    async searchSymbols(query: string) {
        return this.fetch<{
            count: number;
            result: Array<{
                description: string;
                displaySymbol: string;
                symbol: string;
                type: string;
            }>;
        }>(`/search?q=${query}`);
    }

    /**
     * Get forex rates
     * Endpoint: /forex/rates
     */
    async getForexRates(base: string = 'USD') {
        return this.fetch<{
            base: string;
            quote: Record<string, number>;
        }>(`/forex/rates?base=${base}`);
    }

    /**
     * Get crypto candles
     * Endpoint: /crypto/candle
     */
    async getCryptoCandles(symbol: string, resolution: string, from: number, to: number) {
        return this.fetch<{
            c: number[];
            h: number[];
            l: number[];
            o: number[];
            s: string;
            t: number[];
            v: number[];
        }>(`/crypto/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}`);
    }
}

// Export singleton instance
export const finnhubClient = new FinnhubClient();
export default finnhubClient;

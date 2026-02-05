/**
 * Finnhub React Hooks
 * 
 * Custom hooks for fetching and subscribing to Finnhub data
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import useSWR from 'swr';
import finnhubClient from './client';
import finnhubWS, { TradeData } from './websocket';

/**
 * Hook for real-time price updates via WebSocket
 */
export function useRealtimeQuote(symbol: string) {
    const [price, setPrice] = useState<number | null>(null);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
    const [isWsConnected, setIsWsConnected] = useState(false);

    // Initial fetch to get a baseline price
    useEffect(() => {
        if (!symbol) return;
        finnhubClient.getQuote(symbol)
            .then(quote => {
                setPrice(quote.c);
                setLastUpdate(new Date());
            })
            .catch(err => console.error(`[Finnhub] Initial quote error for ${symbol}:`, err));
    }, [symbol]);

    useEffect(() => {
        if (!symbol) return;

        // Connect to WebSocket if possible
        finnhubWS.connect().catch(console.error);

        // Subscribe to symbol
        const unsubscribe = finnhubWS.subscribe(symbol, (data: TradeData) => {
            setPrice(data.p);
            setLastUpdate(new Date(data.t));
        });

        // Monitor connection status
        const statusInterval = setInterval(() => {
            setIsWsConnected(finnhubWS.isActive());
        }, 5000);

        return () => {
            unsubscribe();
            clearInterval(statusInterval);
        };
    }, [symbol]);

    // Fallback Polling if WebSocket is not active
    useEffect(() => {
        if (!symbol || isWsConnected) return;

        console.log(`[Finnhub] Using polling fallback for ${symbol}`);
        const pollInterval = setInterval(async () => {
            try {
                const quote = await finnhubClient.getQuote(symbol);
                setPrice(quote.c);
                setLastUpdate(new Date());
            } catch (err) {
                console.error(`[Finnhub] Polling error for ${symbol}:`, err);
            }
        }, 30000); // 30s polling fallback

        return () => clearInterval(pollInterval);
    }, [symbol, isWsConnected]);

    return { price, lastUpdate, isConnected: isWsConnected };
}

/**
 * Hook for fetching quote snapshot
 */
export function useQuote(symbol: string) {
    const { data, error, isLoading, mutate } = useSWR(
        symbol ? `quote-${symbol}` : null,
        () => finnhubClient.getQuote(symbol),
        {
            refreshInterval: 30000, // Refresh every 30 seconds
            revalidateOnFocus: false,
        }
    );

    return {
        quote: data,
        isLoading,
        isError: error,
        refresh: mutate,
    };
}

/**
 * Hook for fetching company profile
 */
export function useCompanyProfile(symbol: string) {
    const { data, error, isLoading } = useSWR(
        symbol ? `profile-${symbol}` : null,
        () => finnhubClient.getCompanyProfile(symbol),
        {
            revalidateOnFocus: false,
            dedupingInterval: 60000, // Cache for 1 minute
        }
    );

    return {
        profile: data,
        isLoading,
        isError: error,
    };
}

/**
 * Hook for fetching candle data
 */
export function useCandles(
    symbol: string,
    resolution: string = 'D',
    days: number = 30
) {
    const now = Math.floor(Date.now() / 1000);
    const from = now - days * 24 * 60 * 60;

    const { data, error, isLoading } = useSWR(
        symbol ? `candles-${symbol}-${resolution}-${days}` : null,
        () => finnhubClient.getCandles(symbol, resolution, from, now),
        {
            revalidateOnFocus: false,
            dedupingInterval: 300000, // Cache for 5 minutes
        }
    );

    // Transform candle data for chart consumption
    const chartData = data?.t?.map((timestamp, index) => ({
        time: new Date(timestamp * 1000).toLocaleDateString(),
        timestamp,
        open: data.o[index],
        high: data.h[index],
        low: data.l[index],
        close: data.c[index],
        volume: data.v[index],
    })) || [];

    return {
        candles: data,
        chartData,
        isLoading,
        isError: error,
    };
}

/**
 * Hook for market news
 */
export function useMarketNews(category: string = 'general', limit: number = 10) {
    const { data, error, isLoading, mutate } = useSWR(
        `news-${category}`,
        () => finnhubClient.getMarketNews(category),
        {
            refreshInterval: 300000, // Refresh every 5 minutes
            revalidateOnFocus: false,
        }
    );

    return {
        news: data?.slice(0, limit) || [],
        isLoading,
        isError: error,
        refresh: mutate,
    };
}

/**
 * Hook for social sentiment
 */
export function useSocialSentiment(symbol: string, days: number = 7) {
    const to = new Date().toISOString().split('T')[0];
    const from = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const { data, error, isLoading } = useSWR(
        symbol ? `sentiment-${symbol}-${days}` : null,
        () => finnhubClient.getSocialSentiment(symbol, from, to),
        {
            revalidateOnFocus: false,
        }
    );

    return {
        sentiment: data,
        isLoading,
        isError: error,
    };
}

/**
 * Hook for recommendation trends
 */
export function useRecommendationTrends(symbol: string) {
    const { data, error, isLoading } = useSWR(
        symbol ? `recommendations-${symbol}` : null,
        () => finnhubClient.getRecommendationTrends(symbol),
        {
            revalidateOnFocus: false,
            dedupingInterval: 3600000, // Cache for 1 hour
        }
    );

    return {
        recommendations: data,
        isLoading,
        isError: error,
    };
}

/**
 * Hook for symbol search
 */
export function useSymbolSearch(query: string) {
    const { data, error, isLoading } = useSWR(
        query && query.length >= 2 ? `search-${query}` : null,
        () => finnhubClient.searchSymbols(query),
        {
            revalidateOnFocus: false,
            dedupingInterval: 5000,
        }
    );

    return {
        results: data?.result || [],
        count: data?.count || 0,
        isLoading,
        isError: error,
    };
}

/**
 * Hook for earnings calendar
 */
export function useEarningsCalendar(days: number = 30) {
    const from = new Date().toISOString().split('T')[0];
    const to = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const { data, error, isLoading } = useSWR(
        `earnings-${days}`,
        () => finnhubClient.getEarningsCalendar(from, to),
        {
            revalidateOnFocus: false,
            dedupingInterval: 3600000, // Cache for 1 hour
        }
    );

    return {
        earnings: data?.earningsCalendar || [],
        isLoading,
        isError: error,
    };
}

'use client';

import { useState, useRef, useEffect } from 'react';
import { useQuote, useRealtimeQuote } from '@/lib/finnhub/hooks';

// Curated list of symbols for top movers
const TOP_MOVER_SYMBOLS = [
    { symbol: 'COIN', name: 'Coinbase Global', logo: '🪙' },
    { symbol: 'HOOD', name: 'Robinhood Markets', logo: '🪶' },
    { symbol: 'NVDA', name: 'NVIDIA Corp', logo: '🟢' },
    { symbol: 'TSLA', name: 'Tesla Inc', logo: '⚡' },
    { symbol: 'SQ', name: 'Block Inc.', logo: '⬛' },
    { symbol: 'PLTR', name: 'Palantir Technologies', logo: '🔮' },
    { symbol: 'AAPL', name: 'Apple Inc.', logo: '🍎' },
    { symbol: 'MSFT', name: 'Microsoft Corp', logo: '🪟' },
];

function MoverCard({ symbol, name, logo }: { symbol: string; name: string; logo: string }) {
    const { quote, isLoading } = useQuote(symbol);
    const { price: realtimePrice } = useRealtimeQuote(symbol);

    const currentPrice = realtimePrice ?? quote?.c ?? 0;
    const changePercent = quote?.dp ?? 0;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        }).format(value);
    };

    const formatPercent = (value: number) => {
        const prefix = value >= 0 ? '+' : '';
        return `${prefix}${value.toFixed(2)}%`;
    };

    if (isLoading && !quote) {
        return (
            <div className="flex-shrink-0 w-[200px] p-4 rounded-xl bg-bg-elevated border border-border-primary animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-border-primary" />
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-border-primary rounded w-1/2" />
                        <div className="h-3 bg-border-primary rounded w-2/3" />
                    </div>
                </div>
                <div className="space-y-2 mb-4">
                    <div className="h-6 bg-border-primary rounded w-3/4" />
                    <div className="h-4 bg-border-primary rounded w-1/4" />
                </div>
                <div className="flex gap-2">
                    <div className="h-8 bg-border-primary rounded flex-1" />
                    <div className="h-8 bg-border-primary rounded flex-1" />
                </div>
            </div>
        );
    }

    return (
        <div
            className="flex-shrink-0 w-[200px] p-4 rounded-xl bg-bg-elevated border border-border-primary hover:border-border-secondary transition-all"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-bg-card flex items-center justify-center text-xl">
                    {logo}
                </div>
                <div>
                    <div className="font-medium">{symbol}</div>
                    <div className="text-xs text-text-secondary truncate max-w-[120px]">{name}</div>
                </div>
            </div>

            {/* Price */}
            <div className="mb-4">
                <div className="text-xl font-semibold">{formatCurrency(currentPrice)}</div>
                <div className={`text-sm ${changePercent >= 0 ? 'text-success' : 'text-accent-coral'}`}>
                    {formatPercent(changePercent)}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                <button className="flex-1 py-2 px-3 rounded-lg bg-accent-coral/20 text-accent-coral text-sm font-medium hover:bg-accent-coral/30 transition-colors">
                    Sell
                </button>
                <button className="flex-1 py-2 px-3 rounded-lg bg-accent-teal/20 text-accent-teal text-sm font-medium hover:bg-accent-teal/30 transition-colors">
                    Buy
                </button>
            </div>
        </div>
    );
}

export default function TopMovers() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold">Today&apos;s Movers</h2>
                    <p className="text-xs text-text-secondary">Live market data from Finnhub</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="p-2 rounded-lg bg-bg-elevated hover:bg-border-primary transition-colors"
                        aria-label="Scroll left"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-2 rounded-lg bg-bg-elevated hover:bg-border-primary transition-colors"
                        aria-label="Scroll right"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {TOP_MOVER_SYMBOLS.map((mover) => (
                    <MoverCard key={mover.symbol} {...mover} />
                ))}
            </div>
        </div>
    );
}

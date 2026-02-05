'use client';

import { useState, useRef } from 'react';

// Mock top movers data - will be replaced with Finnhub data
const mockTopMovers = [
    {
        symbol: 'COIN',
        name: 'Coinbase Global',
        logo: '🪙',
        price: 225.47,
        change: 18.92,
        changePercent: 9.16,
    },
    {
        symbol: 'HOOD',
        name: 'Robinhood Markets',
        logo: '🪶',
        price: 18.34,
        change: 1.45,
        changePercent: 8.58,
    },
    {
        symbol: 'SQ',
        name: 'Block Inc.',
        logo: '⬛',
        price: 78.92,
        change: 5.23,
        changePercent: 7.10,
    },
    {
        symbol: 'PLTR',
        name: 'Palantir Technologies',
        logo: '🔮',
        price: 24.56,
        change: 1.34,
        changePercent: 5.77,
    },
    {
        symbol: 'SOFI',
        name: 'SoFi Technologies',
        logo: '💳',
        price: 9.87,
        change: 0.52,
        changePercent: 5.56,
    },
    {
        symbol: 'RIVN',
        name: 'Rivian Automotive',
        logo: '🚗',
        price: 15.23,
        change: 0.78,
        changePercent: 5.40,
    },
    {
        symbol: 'PYPL',
        name: 'PayPal Holdings',
        logo: '💰',
        price: 62.45,
        change: 2.89,
        changePercent: 4.85,
    },
    {
        symbol: 'DIS',
        name: 'Walt Disney Co.',
        logo: '🏰',
        price: 112.78,
        change: 4.56,
        changePercent: 4.21,
    },
];

export default function TopMovers() {
    const [movers] = useState(mockTopMovers);
    const scrollRef = useRef<HTMLDivElement>(null);

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
                <h2 className="text-lg font-semibold">Today&apos;s Top Movers</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="p-2 rounded-lg bg-bg-elevated hover:bg-border-primary transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-2 rounded-lg bg-bg-elevated hover:bg-border-primary transition-colors"
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
                {movers.map((mover) => (
                    <div
                        key={mover.symbol}
                        className="flex-shrink-0 w-[200px] p-4 rounded-xl bg-bg-elevated border border-border-primary hover:border-border-secondary transition-all"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-bg-card flex items-center justify-center text-xl">
                                {mover.logo}
                            </div>
                            <div>
                                <div className="font-medium">{mover.symbol}</div>
                                <div className="text-xs text-text-secondary truncate max-w-[120px]">{mover.name}</div>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="mb-4">
                            <div className="text-xl font-semibold">{formatCurrency(mover.price)}</div>
                            <div className={`text-sm ${mover.changePercent >= 0 ? 'text-success' : 'text-accent-coral'}`}>
                                {formatPercent(mover.changePercent)}
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
                ))}
            </div>
        </div>
    );
}

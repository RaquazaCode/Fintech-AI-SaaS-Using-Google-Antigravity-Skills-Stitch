'use client';

import { useState } from 'react';
import {
    LineChart,
    Line,
    ResponsiveContainer,
} from 'recharts';

// Mock watchlist data - will be replaced with Finnhub data
const mockWatchlist = [
    {
        symbol: 'AMZN',
        name: 'Amazon.com Inc.',
        logo: '📦',
        price: 178.25,
        change: 2.15,
        changePercent: 1.22,
        chartData: [175, 176, 177, 176, 178, 177, 178],
    },
    {
        symbol: 'META',
        name: 'Meta Platforms',
        logo: '👤',
        price: 505.68,
        change: 8.45,
        changePercent: 1.70,
        chartData: [495, 498, 502, 500, 504, 503, 506],
    },
    {
        symbol: 'AMD',
        name: 'Advanced Micro Devices',
        logo: '🔴',
        price: 164.32,
        change: -2.18,
        changePercent: -1.31,
        chartData: [168, 167, 165, 166, 164, 165, 164],
    },
    {
        symbol: 'NFLX',
        name: 'Netflix Inc.',
        logo: '🎬',
        price: 628.90,
        change: 12.34,
        changePercent: 2.00,
        chartData: [615, 618, 622, 620, 625, 627, 629],
    },
];

export default function WatchlistPanel() {
    const [watchlist] = useState(mockWatchlist);

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

    return (
        <div className="card h-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">My Watchlist</h2>
                <button className="text-sm text-accent-blue hover:underline">Edit</button>
            </div>

            <div className="space-y-4">
                {watchlist.map((item) => (
                    <div
                        key={item.symbol}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-bg-elevated transition-colors cursor-pointer"
                    >
                        {/* Logo */}
                        <div className="w-10 h-10 rounded-full bg-bg-elevated flex items-center justify-center text-xl flex-shrink-0">
                            {item.logo}
                        </div>

                        {/* Symbol & Name */}
                        <div className="flex-1 min-w-0">
                            <div className="font-medium">{item.symbol}</div>
                            <div className="text-xs text-text-secondary truncate">{item.name}</div>
                        </div>

                        {/* Chart */}
                        <div className="w-16 flex-shrink-0">
                            <ResponsiveContainer width={64} height={28}>
                                <LineChart data={item.chartData.map((v, i) => ({ v, i }))}>
                                    <Line
                                        type="monotone"
                                        dataKey="v"
                                        stroke={item.changePercent >= 0 ? '#22C55E' : '#F97066'}
                                        strokeWidth={1.5}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Price */}
                        <div className="text-right flex-shrink-0">
                            <div className="font-medium text-sm">{formatCurrency(item.price)}</div>
                            <div className={`text-xs ${item.changePercent >= 0 ? 'text-success' : 'text-accent-coral'}`}>
                                {formatPercent(item.changePercent)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Symbol Button */}
            <button className="w-full mt-4 py-3 border border-dashed border-border-secondary rounded-xl text-text-secondary hover:border-accent-blue hover:text-accent-blue transition-colors text-sm">
                + Add symbol
            </button>
        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    ResponsiveContainer,
} from 'recharts';

// Mock data for trades - will be replaced with Finnhub data
const mockTrades = [
    {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        logo: '🍎',
        price: 178.42,
        change: 2.34,
        changePercent: 1.33,
        profit: 1245.67,
        chartData: [170, 172, 175, 173, 178, 176, 178],
    },
    {
        symbol: 'TSLA',
        name: 'Tesla, Inc.',
        logo: '⚡',
        price: 242.89,
        change: -5.12,
        changePercent: -2.06,
        profit: -320.45,
        chartData: [250, 248, 245, 247, 243, 244, 243],
    },
    {
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        logo: '💚',
        price: 875.28,
        change: 15.67,
        changePercent: 1.82,
        profit: 2890.12,
        chartData: [850, 855, 860, 858, 870, 872, 875],
    },
    {
        symbol: 'MSFT',
        name: 'Microsoft Corp.',
        logo: '🪟',
        price: 378.91,
        change: 3.45,
        changePercent: 0.92,
        profit: 567.89,
        chartData: [372, 374, 376, 375, 377, 378, 379],
    },
    {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        logo: '🔍',
        price: 141.23,
        change: 1.89,
        changePercent: 1.36,
        profit: 432.10,
        chartData: [138, 139, 140, 139, 141, 140, 141],
    },
];

export default function TradesTable() {
    const [trades] = useState(mockTrades);

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
        <div className="card">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">My Trades</h2>
                <button className="text-sm text-accent-blue hover:underline">View all</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-xs text-text-secondary border-b border-border-primary">
                            <th className="pb-3 font-medium">Symbol</th>
                            <th className="pb-3 font-medium">1d</th>
                            <th className="pb-3 font-medium text-right">Price</th>
                            <th className="pb-3 font-medium text-right">Total profit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trades.map((trade) => (
                            <tr
                                key={trade.symbol}
                                className="border-b border-border-primary last:border-0 hover:bg-bg-elevated transition-colors cursor-pointer"
                            >
                                {/* Symbol Column */}
                                <td className="py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-bg-elevated flex items-center justify-center text-xl">
                                            {trade.logo}
                                        </div>
                                        <div>
                                            <div className="font-medium">{trade.symbol}</div>
                                            <div className="text-xs text-text-secondary">{trade.name}</div>
                                        </div>
                                    </div>
                                </td>

                                {/* Sparkline Chart */}
                                <td className="py-4 w-24">
                                    <ResponsiveContainer width={80} height={32}>
                                        <LineChart data={trade.chartData.map((v, i) => ({ v, i }))}>
                                            <Line
                                                type="monotone"
                                                dataKey="v"
                                                stroke={trade.changePercent >= 0 ? '#22C55E' : '#F97066'}
                                                strokeWidth={1.5}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </td>

                                {/* Price Column */}
                                <td className="py-4 text-right">
                                    <div className="font-medium">{formatCurrency(trade.price)}</div>
                                    <div className={`text-xs ${trade.changePercent >= 0 ? 'text-success' : 'text-accent-coral'}`}>
                                        {formatPercent(trade.changePercent)}
                                    </div>
                                </td>

                                {/* Profit Column */}
                                <td className="py-4 text-right">
                                    <div className={`font-semibold ${trade.profit >= 0 ? 'text-success' : 'text-accent-coral'}`}>
                                        {trade.profit >= 0 ? '+' : ''}{formatCurrency(trade.profit)}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

'use client';

import {
    LineChart,
    Line,
    ResponsiveContainer,
} from 'recharts';
import { useQuote, useRealtimeQuote } from '@/lib/finnhub/hooks';

// Mock data for initial names and logos
const TRADE_INFO: Record<string, { name: string, logo: string, initialProfit: number }> = {
    'AAPL': { name: 'Apple Inc.', logo: '🍎', initialProfit: 1245.67 },
    'TSLA': { name: 'Tesla, Inc.', logo: '⚡', initialProfit: -320.45 },
    'NVDA': { name: 'NVIDIA Corporation', logo: '💚', initialProfit: 2890.12 },
    'MSFT': { name: 'Microsoft Corp.', logo: '🪟', initialProfit: 567.89 },
    'GOOGL': { name: 'Alphabet Inc.', logo: '🔍', initialProfit: 432.10 },
};

const SYMBOLS = Object.keys(TRADE_INFO);

function TradeRow({ symbol }: { symbol: string }) {
    const { quote, isLoading } = useQuote(symbol);
    const { price: livePrice } = useRealtimeQuote(symbol);
    const info = TRADE_INFO[symbol];

    const currentPrice = livePrice || quote?.c || 0;
    const changePercent = quote?.dp || 0;
    const profit = info.initialProfit + (currentPrice - (quote?.pc || currentPrice)) * 100; // Simulated profit for demo

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        }).format(value);
    };

    const formatPercent = (value: number | null | undefined) => {
        if (value === null || value === undefined) return '0.00%';
        const prefix = value >= 0 ? '+' : '';
        return `${prefix}${value.toFixed(2)}%`;
    };

    // Simulated chart data
    const chartData = [
        { v: quote?.o || 0 },
        { v: quote?.l || 0 },
        { v: quote?.h || 0 },
        { v: currentPrice }
    ];

    if (isLoading && !quote) {
        return (
            <tr className="animate-pulse border-b border-border-primary">
                <td className="py-4" colSpan={4}>
                    <div className="h-10 bg-bg-primary rounded-lg w-full"></div>
                </td>
            </tr>
        );
    }

    return (
        <tr
            key={symbol}
            className="border-b border-border-primary last:border-0 hover:bg-bg-primary transition-colors cursor-pointer"
        >
            {/* Symbol Column */}
            <td className="py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-bg-primary flex items-center justify-center text-xl">
                        {info.logo}
                    </div>
                    <div>
                        <div className="font-medium">{symbol}</div>
                        <div className="text-xs text-text-secondary">{info.name}</div>
                    </div>
                </div>
            </td>

            {/* Sparkline Chart */}
            <td className="py-4 w-24">
                <ResponsiveContainer width={80} height={32}>
                    <LineChart data={chartData}>
                        <Line
                            type="monotone"
                            dataKey="v"
                            stroke={changePercent >= 0 ? '#00B29C' : '#FF6363'}
                            strokeWidth={1.5}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </td>

            {/* Price Column */}
            <td className="py-4 text-right">
                <div className="font-medium">{formatCurrency(currentPrice)}</div>
                <div className={`text-xs ${changePercent >= 0 ? 'text-success' : 'text-accent-coral'}`}>
                    {formatPercent(changePercent)}
                </div>
            </td>

            {/* Profit Column */}
            <td className="py-4 text-right">
                <div className={`font-semibold ${profit >= 0 ? 'text-success' : 'text-accent-coral'}`}>
                    {profit >= 0 ? '+' : ''}{formatCurrency(profit)}
                </div>
            </td>
        </tr>
    );
}

export default function TradesTable() {
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
                        {SYMBOLS.map((symbol) => (
                            <TradeRow key={symbol} symbol={symbol} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

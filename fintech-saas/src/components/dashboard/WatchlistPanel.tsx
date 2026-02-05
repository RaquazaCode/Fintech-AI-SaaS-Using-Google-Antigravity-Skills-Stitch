'use client';

import {
    LineChart,
    Line,
    ResponsiveContainer,
} from 'recharts';
import { useQuote, useRealtimeQuote, useCandles } from '@/lib/finnhub/hooks';

// Mock data for initial names and logos
const WATCHLIST_INFO: Record<string, { name: string, logo: string }> = {
    'META': { name: 'Meta Platforms', logo: '💙' },
    'NFLX': { name: 'Netflix, Inc.', logo: '🍎' }, // Using red apple as placeholder logo
    'AMZN': { name: 'Amazon.com', logo: '📦' },
    'COIN': { name: 'Coinbase Global', logo: '🪙' },
};

const SYMBOLS = Object.keys(WATCHLIST_INFO);

function WatchlistItem({ symbol }: { symbol: string }) {
    const { quote, isLoading: isQuoteLoading } = useQuote(symbol);
    const { price: livePrice } = useRealtimeQuote(symbol);
    const { chartData, isLoading: isCandleLoading } = useCandles(symbol, 'D', 30);
    const info = WATCHLIST_INFO[symbol];

    const currentPrice = livePrice || quote?.c || 0;
    const changePercent = quote?.dp || 0;

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

    // Use real historical data for chart, fallback to high/low if loading
    const displayChartData = chartData.length > 0
        ? chartData.map(d => ({ v: d.close }))
        : [
            { v: quote?.o || 0 },
            { v: quote?.l || 0 },
            { v: quote?.h || 0 },
            { v: currentPrice }
        ];

    if (isQuoteLoading && !quote) {
        return (
            <div className="animate-pulse flex items-center gap-3 p-3">
                <div className="w-10 h-10 rounded-full bg-bg-primary"></div>
                <div className="flex-1 h-6 bg-bg-primary rounded"></div>
            </div>
        );
    }

    return (
        <div
            key={symbol}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-bg-primary transition-colors cursor-pointer"
        >
            {/* Logo */}
            <div className="w-10 h-10 rounded-full bg-bg-primary flex items-center justify-center text-xl flex-shrink-0">
                {info.logo}
            </div>

            {/* Symbol & Name */}
            <div className="flex-1 min-w-0">
                <div className="font-medium">{symbol}</div>
                <div className="text-xs text-text-secondary truncate">{info.name}</div>
            </div>

            {/* Chart */}
            <div className="w-16 flex-shrink-0">
                <ResponsiveContainer width={64} height={28}>
                    <LineChart data={displayChartData}>
                        <Line
                            type="monotone"
                            dataKey="v"
                            stroke={changePercent >= 0 ? '#00B29C' : '#FF6363'}
                            strokeWidth={1.5}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Price */}
            <div className="text-right flex-shrink-0">
                <div className="font-medium text-sm">{formatCurrency(currentPrice)}</div>
                <div className={`text-xs ${changePercent >= 0 ? 'text-success' : 'text-accent-coral'}`}>
                    {formatPercent(changePercent)}
                </div>
            </div>
        </div>
    );
}

export default function WatchlistPanel() {
    return (
        <div className="card h-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Watchlist</h2>
                <button className="p-1.5 hover:bg-bg-primary rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>

            <div className="space-y-4">
                {SYMBOLS.map((symbol) => (
                    <WatchlistItem key={symbol} symbol={symbol} />
                ))}
            </div>

            <button className="w-full mt-6 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors border-t border-border-primary pt-4">
                View all watchlist
            </button>
        </div>
    );
}

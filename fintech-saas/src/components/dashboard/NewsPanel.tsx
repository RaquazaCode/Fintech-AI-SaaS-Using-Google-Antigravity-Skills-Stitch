'use client';

import { useState } from 'react';

// Mock news data - will be replaced with Finnhub getMarketNews()
const mockNews = [
    {
        id: 1,
        headline: 'Fed Signals Potential Rate Cuts in 2024 as Inflation Cools',
        source: 'Reuters',
        datetime: Date.now() - 3600000, // 1 hour ago
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&h=120&fit=crop',
        related: 'SPY',
        relatedChange: 1.24,
        summary: 'Federal Reserve officials indicated they may begin cutting interest rates this year...',
        url: '#',
    },
    {
        id: 2,
        headline: 'NVIDIA Announces Next-Gen AI Chips at Annual Conference',
        source: 'Bloomberg',
        datetime: Date.now() - 7200000, // 2 hours ago
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=120&fit=crop',
        related: 'NVDA',
        relatedChange: 3.45,
        summary: 'The chipmaker unveiled its latest generation of AI accelerators...',
        url: '#',
    },
    {
        id: 3,
        headline: 'Apple Expands AI Features Across Product Lineup',
        source: 'CNBC',
        datetime: Date.now() - 14400000, // 4 hours ago
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=120&fit=crop',
        related: 'AAPL',
        relatedChange: 0.87,
        summary: 'Apple announced significant AI upgrades coming to iPhone, iPad, and Mac...',
        url: '#',
    },
    {
        id: 4,
        headline: 'Oil Prices Rise on Middle East Supply Concerns',
        source: 'Financial Times',
        datetime: Date.now() - 21600000, // 6 hours ago
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=200&h=120&fit=crop',
        related: 'USO',
        relatedChange: 2.12,
        summary: 'Crude oil futures climbed as traders assessed risks to global supply...',
        url: '#',
    },
];

export default function NewsPanel() {
    const [news] = useState(mockNews);

    const formatTimeAgo = (timestamp: number) => {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        if (seconds < 60) return 'Just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    };

    const formatPercent = (value: number) => {
        const prefix = value >= 0 ? '+' : '';
        return `${prefix}${value.toFixed(2)}%`;
    };

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Latest News</h2>
                <button className="text-sm text-accent-blue hover:underline">View all</button>
            </div>

            <div className="space-y-4">
                {news.map((item) => (
                    <a
                        key={item.id}
                        href={item.url}
                        className="flex gap-4 p-3 rounded-xl hover:bg-bg-elevated transition-colors group"
                    >
                        {/* Thumbnail */}
                        <div className="w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-bg-elevated">
                            <div
                                className="w-full h-full bg-center bg-cover"
                                style={{ backgroundImage: `url(${item.image})` }}
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm leading-tight group-hover:text-accent-blue transition-colors line-clamp-2">
                                {item.headline}
                            </h3>
                            <div className="flex items-center gap-3 mt-2 text-xs text-text-secondary">
                                <span>{item.source}</span>
                                <span>•</span>
                                <span>{formatTimeAgo(item.datetime)}</span>
                                {item.related && (
                                    <>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <span className="font-medium text-text-primary">{item.related}</span>
                                            <span className={item.relatedChange >= 0 ? 'text-success' : 'text-accent-coral'}>
                                                {formatPercent(item.relatedChange)}
                                            </span>
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

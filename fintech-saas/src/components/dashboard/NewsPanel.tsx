'use client';

import { useMarketNews } from '@/lib/finnhub/hooks';
import Link from 'next/link';

export default function NewsPanel() {
    const { news, isLoading } = useMarketNews('general', 4);

    const formatTimeAgo = (timestamp: number) => {
        const seconds = Math.floor((Date.now() - timestamp * 1000) / 1000);
        if (seconds < 60) return 'Just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    };

    const formatPercent = (value: number | null | undefined) => {
        if (value === null || value === undefined) return '0.00%';
        const prefix = value >= 0 ? '+' : '';
        return `${prefix}${value.toFixed(2)}%`;
    };

    if (isLoading && news.length === 0) {
        return (
            <div className="card animate-pulse">
                <div className="h-6 bg-bg-primary rounded w-1/3 mb-6"></div>
                <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex gap-4 p-3">
                            <div className="w-24 h-16 bg-bg-primary rounded-lg"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-bg-primary rounded w-full"></div>
                                <div className="h-4 bg-bg-primary rounded w-2/3"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Latest News</h2>
                <Link href="/news" className="text-sm text-accent-blue hover:underline">
                    View all news
                </Link>
            </div>

            <div className="space-y-4">
                {news.map((item) => (
                    <a
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-4 p-3 rounded-xl hover:bg-bg-primary transition-colors group"
                    >
                        {/* Thumbnail */}
                        <div className="w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-bg-primary">
                            {item.image ? (
                                <div
                                    className="w-full h-full bg-center bg-cover"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-text-secondary">
                                    📰
                                </div>
                            )}
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

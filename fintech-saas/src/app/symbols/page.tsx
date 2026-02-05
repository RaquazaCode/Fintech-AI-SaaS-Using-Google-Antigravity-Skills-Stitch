'use client';

import { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import { TradesTable, WatchlistPanel, TopMovers } from '@/components/dashboard';

export default function SymbolsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Market Symbols</h1>
                        <p className="text-text-secondary mt-1">Explore and track over 5,000+ stocks and assets</p>
                    </div>
                    <div className="relative w-full md:w-96">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">🔍</span>
                        <input
                            type="text"
                            placeholder="Search symbols (e.g. AAPL, TSLA)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-bg-secondary border border-border-primary rounded-2xl focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/10 outline-none transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="card">
                            <h2 className="text-xl font-bold mb-6">Trending Assets</h2>
                            <TopMovers />
                        </div>
                        <TradesTable />
                    </div>

                    {/* Sidebar components */}
                    <div className="space-y-6">
                        <WatchlistPanel />

                        {/* Market Sentiment Card (Placeholder) */}
                        <div className="card bg-gradient-to-br from-accent-blue to-accent-purple text-white">
                            <h3 className="text-lg font-bold mb-2">Market Sentiment</h3>
                            <p className="text-white/80 text-sm mb-4">Overall market is currently bullish. 68% of traders are long on top 50 stocks.</p>
                            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                                <div className="h-full bg-white w-[68%] shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                            </div>
                            <div className="flex justify-between mt-2 text-xs font-bold">
                                <span>68% BULLISH</span>
                                <span>32% BEARISH</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}

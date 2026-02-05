'use client';

import AppShell from '@/components/layout/AppShell';
import { NewsPanel } from '@/components/dashboard';

export default function NewsPage() {
    return (
        <AppShell>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Market Insights</h1>
                    <p className="text-text-secondary mt-1">Real-time financial news and global market analysis</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                    {/* Featured News / Main Feed */}
                    <div className="xl:col-span-3">
                        <NewsPanel />
                    </div>

                    {/* Filters & Trending Topics */}
                    <div className="space-y-6">
                        <div className="card">
                            <h3 className="text-lg font-bold mb-4">Trending Topics</h3>
                            <div className="flex flex-wrap gap-2">
                                {['#FederalReserve', '#Crypto', '#Inflation', '#EarningsSeason', '#AI', '#TechStocks'].map(tag => (
                                    <button key={tag} className="px-3 py-1.5 bg-bg-secondary hover:bg-bg-primary border border-border-primary rounded-full text-xs font-medium transition-colors">
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="card">
                            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
                            <p className="text-sm text-text-secondary mb-4">Get daily market summaries delivered to your inbox.</p>
                            <input
                                type="email"
                                placeholder="email@example.com"
                                className="w-full px-4 py-2 bg-bg-secondary border border-border-primary rounded-xl mb-3 outline-none focus:border-accent-blue"
                            />
                            <button className="w-full py-2.5 bg-accent-blue text-white rounded-xl text-sm font-bold shadow-lg shadow-accent-blue/20">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}

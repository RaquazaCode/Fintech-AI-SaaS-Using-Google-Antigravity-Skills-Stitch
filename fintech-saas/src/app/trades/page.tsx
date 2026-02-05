'use client';

import AppShell from '@/components/layout/AppShell';
import { TradesTable } from '@/components/dashboard';

export default function TradesPage() {
    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Trade History</h1>
                        <p className="text-text-secondary mt-1">Review and analyze your past trading performance</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-3 bg-bg-secondary border border-border-primary rounded-2xl font-bold text-sm hover:bg-bg-primary transition-all">
                            Export CSV
                        </button>
                        <button className="px-6 py-3 bg-accent-blue text-white rounded-2xl font-bold text-sm shadow-lg shadow-accent-blue/20 hover:scale-[1.02] active:scale-95 transition-all">
                            New Trade
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Summary Cards */}
                    <div className="card text-center">
                        <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Total P/L</span>
                        <div className="text-2xl font-bold text-success mt-1">+$14,230.45</div>
                    </div>
                    <div className="card text-center">
                        <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Win Rate</span>
                        <div className="text-2xl font-bold text-accent-blue mt-1">72.4%</div>
                    </div>
                    <div className="card text-center">
                        <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Avg. Profit</span>
                        <div className="text-2xl font-bold text-text-primary mt-1">$420.50</div>
                    </div>
                    <div className="card text-center">
                        <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Open Positions</span>
                        <div className="text-2xl font-bold text-accent-coral mt-1">8</div>
                    </div>

                    <div className="lg:col-span-4">
                        <TradesTable />
                    </div>
                </div>
            </div>
        </AppShell>
    );
}

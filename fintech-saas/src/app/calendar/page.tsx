'use client';

import AppShell from '@/components/layout/AppShell';
import { EventsTable } from '@/components/dashboard';

export default function CalendarPage() {
    return (
        <AppShell>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Earnings Calendar</h1>
                    <p className="text-text-secondary mt-1">Stay ahead of the curve with upcoming corporate earnings reports</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div className="card !p-0 overflow-hidden">
                        <div className="p-6 border-b border-border-primary flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button className="p-2 hover:bg-bg-secondary rounded-lg border border-border-primary">◀</button>
                                <span className="font-bold">February 2026</span>
                                <button className="p-2 hover:bg-bg-secondary rounded-lg border border-border-primary">▶</button>
                            </div>
                            <div className="flex bg-bg-secondary p-1 rounded-xl border border-border-primary">
                                <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-sm font-bold">List View</button>
                                <button className="px-4 py-1.5 text-text-secondary text-sm font-medium">Monthly</button>
                            </div>
                        </div>
                        <EventsTable />
                    </div>
                </div>
            </div>
        </AppShell>
    );
}

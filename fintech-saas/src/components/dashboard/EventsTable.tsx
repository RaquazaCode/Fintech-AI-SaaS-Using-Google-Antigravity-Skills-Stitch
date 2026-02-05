'use client';

import { useEarningsCalendar } from '@/lib/finnhub/hooks';

export default function EventsTable() {
    const { earnings, isLoading } = useEarningsCalendar(30);

    const impactColors = {
        high: 'bg-accent-coral',
        medium: 'bg-warning',
        low: 'bg-success',
    };

    if (isLoading && earnings.length === 0) {
        return (
            <div className="card h-full animate-pulse">
                <div className="h-6 bg-bg-primary rounded w-1/4 mb-6"></div>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="h-12 bg-bg-primary rounded"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="card h-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Earnings Calendar</h2>
                <button className="text-sm text-accent-blue hover:underline">View more</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-xs text-text-secondary border-b border-border-primary">
                            <th className="pb-3 font-medium">Symbol</th>
                            <th className="pb-3 font-medium">Date</th>
                            <th className="pb-3 font-medium text-right">EPS Est.</th>
                            <th className="pb-3 font-medium text-right">Rev. Est.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {earnings.slice(0, 10).map((event, idx) => (
                            <tr
                                key={`${event.symbol}-${idx}`}
                                className="border-b border-border-primary last:border-0 hover:bg-bg-primary transition-colors"
                            >
                                {/* Symbol */}
                                <td className="py-3">
                                    <div className="font-medium text-accent-blue">{event.symbol}</div>
                                </td>

                                {/* Date */}
                                <td className="py-3 text-text-secondary">
                                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </td>

                                {/* EPS Estimate */}
                                <td className="py-3 text-right">
                                    <span className="font-medium">${event.epsEstimate.toFixed(2)}</span>
                                </td>

                                {/* Revenue Estimate */}
                                <td className="py-3 text-right">
                                    <span className="text-text-secondary">
                                        {(event.revenueEstimate / 1e9).toFixed(1)}B
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

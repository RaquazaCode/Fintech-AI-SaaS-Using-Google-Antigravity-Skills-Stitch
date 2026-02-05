'use client';

import { useState } from 'react';

// Mock events data - will be replaced with Finnhub earnings calendar
const mockEvents = [
    {
        id: 1,
        time: '08:30',
        currency: 'USD',
        event: 'Non-Farm Payrolls',
        impact: 'high',
        actual: '216K',
        forecast: '175K',
        previous: '187K',
    },
    {
        id: 2,
        time: '10:00',
        currency: 'USD',
        event: 'ISM Manufacturing PMI',
        impact: 'high',
        actual: '49.1',
        forecast: '48.5',
        previous: '47.8',
    },
    {
        id: 3,
        time: '14:00',
        currency: 'USD',
        event: 'FOMC Meeting Minutes',
        impact: 'high',
        actual: null,
        forecast: null,
        previous: null,
    },
    {
        id: 4,
        time: '16:00',
        currency: 'EUR',
        event: 'ECB President Speech',
        impact: 'medium',
        actual: null,
        forecast: null,
        previous: null,
    },
    {
        id: 5,
        time: '19:30',
        currency: 'JPY',
        event: 'BoJ Interest Rate Decision',
        impact: 'high',
        actual: null,
        forecast: '0.10%',
        previous: '0.00%',
    },
];

const impactColors = {
    high: 'bg-accent-coral',
    medium: 'bg-warning',
    low: 'bg-success',
};

const currencyFlags: Record<string, string> = {
    USD: '🇺🇸',
    EUR: '🇪🇺',
    GBP: '🇬🇧',
    JPY: '🇯🇵',
    CHF: '🇨🇭',
    AUD: '🇦🇺',
    CAD: '🇨🇦',
    NZD: '🇳🇿',
};

export default function EventsTable() {
    const [events] = useState(mockEvents);

    return (
        <div className="card h-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Upcoming Events</h2>
                <button className="text-sm text-accent-blue hover:underline">Calendar</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-xs text-text-secondary border-b border-border-primary">
                            <th className="pb-3 font-medium">Time</th>
                            <th className="pb-3 font-medium">Event</th>
                            <th className="pb-3 font-medium text-center">Impact</th>
                            <th className="pb-3 font-medium text-right">Actual</th>
                            <th className="pb-3 font-medium text-right">Forecast</th>
                            <th className="pb-3 font-medium text-right">Previous</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr
                                key={event.id}
                                className="border-b border-border-primary last:border-0 hover:bg-bg-elevated transition-colors"
                            >
                                {/* Time */}
                                <td className="py-3 text-text-secondary font-mono">{event.time}</td>

                                {/* Event */}
                                <td className="py-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{currencyFlags[event.currency] || '🌍'}</span>
                                        <div>
                                            <div className="font-medium">{event.event}</div>
                                            <div className="text-xs text-text-secondary">{event.currency}</div>
                                        </div>
                                    </div>
                                </td>

                                {/* Impact */}
                                <td className="py-3 text-center">
                                    <span
                                        className={`inline-block w-3 h-3 rounded-full ${impactColors[event.impact as keyof typeof impactColors]}`}
                                        title={`${event.impact.charAt(0).toUpperCase() + event.impact.slice(1)} impact`}
                                    />
                                </td>

                                {/* Actual */}
                                <td className="py-3 text-right font-medium">
                                    {event.actual || (
                                        <span className="text-text-muted">—</span>
                                    )}
                                </td>

                                {/* Forecast */}
                                <td className="py-3 text-right text-text-secondary">
                                    {event.forecast || (
                                        <span className="text-text-muted">—</span>
                                    )}
                                </td>

                                {/* Previous */}
                                <td className="py-3 text-right text-text-secondary">
                                    {event.previous || (
                                        <span className="text-text-muted">—</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

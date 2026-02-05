'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Navigation items based on design assets
const navItems = [
    { name: 'Overview', href: '/', icon: '📊' },
    { name: 'Symbols', href: '/symbols', icon: '💹' },
    { name: 'My trades', href: '/trades', icon: '📈' },
    { name: 'News', href: '/news', icon: '📰' },
    { name: 'Calendar', href: '/calendar', icon: '📅' },
    { name: 'Opportunities', href: '/opportunities', icon: '🎯' },
    { name: 'Tech analysis', href: '/analysis', icon: '📉' },
    { name: 'Lessons', href: '/lessons', icon: '📚' },
    { name: 'Strategies', href: '/strategies', icon: '🧠' },
    { name: 'Promotions', href: '/promotions', icon: '🎁' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-[260px] h-screen bg-bg-secondary flex flex-col border-r border-border-primary">
            {/* Logo Section */}
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-blue flex items-center justify-center text-white font-bold text-lg">
                        T
                    </div>
                    <div>
                        <span className="text-lg font-semibold">tradeapp</span>
                        <span className="ml-1 px-1.5 py-0.5 bg-accent-coral text-xs rounded-full">3</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-4 space-y-2">
                <button className="w-full py-3 px-4 bg-accent-blue hover:bg-blue-600 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2">
                    <span className="text-lg">+</span>
                    Start Trade
                </button>
                <button className="w-full py-3 px-4 bg-bg-primary hover:bg-bg-secondary rounded-xl text-text-primary font-medium transition-all border border-border-primary flex items-center justify-center gap-2">
                    <span className="text-lg">↑</span>
                    Top Up
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 mt-6 px-2 overflow-y-auto">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                        ? 'bg-accent-blue/10 text-accent-blue'
                                        : 'text-text-secondary hover:bg-bg-primary hover:text-text-primary'
                                        }`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Bottom Section - User Profile */}
            <div className="p-4 border-t border-border-primary">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 rounded-full bg-accent-purple flex items-center justify-center text-white font-medium">
                        C
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">Chris Johnson</div>
                        <div className="text-xs text-text-secondary">Pro Account</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

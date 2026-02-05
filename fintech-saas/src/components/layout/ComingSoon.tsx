'use client';

import AppShell from '@/components/layout/AppShell';

interface GenericPageProps {
    title: string;
    description: string;
    icon: string;
}

function GenericComingSoon({ title, description, icon }: GenericPageProps) {
    return (
        <AppShell>
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 rounded-3xl flex items-center justify-center text-5xl mb-8 border border-accent-blue/20 shadow-xl shadow-accent-blue/5">
                    {icon}
                </div>
                <h1 className="text-4xl font-bold tracking-tight mb-4">{title}</h1>
                <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                    {description}
                </p>
                <div className="flex gap-4">
                    <button className="px-8 py-3 bg-bg-secondary border border-border-primary rounded-2xl font-bold text-sm hover:bg-bg-primary transition-all">
                        Notify Me
                    </button>
                    <button className="px-8 py-3 bg-accent-blue text-white rounded-2xl font-bold text-sm shadow-lg shadow-accent-blue/20 hover:scale-[1.02] active:scale-95 transition-all">
                        Back to Dashboard
                    </button>
                </div>

                {/* Aesthetic Decoration */}
                <div className="mt-16 grid grid-cols-3 gap-4 w-full opacity-50">
                    <div className="h-32 bg-bg-secondary rounded-2xl animate-pulse" />
                    <div className="h-32 bg-bg-secondary rounded-2xl animate-pulse delay-75" />
                    <div className="h-32 bg-bg-secondary rounded-2xl animate-pulse delay-150" />
                </div>
            </div>
        </AppShell>
    );
}

// Map of page configs
const PAGE_CONFIGS = {
    opportunities: { title: 'Trading Opportunities', description: 'AI-powered trading signals and market opportunity discovery is currently in limited beta. We are crunching the latest data to bring you the best setups.', icon: '🎯' },
    analysis: { title: 'Technical Analysis', description: 'Advanced charting tools and technical indicator automation will be available here soon. We are integrating high-performance WebGL chart rendering.', icon: '📉' },
    lessons: { title: 'Learning Center', description: 'Master the markets with our comprehensive trading curriculum. From basics to advanced algorithmic strategies, everything you need to win.', icon: '📚' },
    strategies: { title: 'Strategy Builder', description: 'Backtest and deploy your custom trading strategies with zero code. Our cloud-based engine ensures your alpha is tested against real history.', icon: '🧠' },
    promotions: { title: 'Rewards & Offers', description: 'Exclusive deals for our pro traders. Get discounted API rates, free trading tools, and ecosystem rewards.', icon: '🎁' },
    settings: { title: 'Account Settings', description: 'Manage your profile, API keys, and notification preferences. Secure and simple.', icon: '⚙️' },
};

// These will be individual page files eventually, but I'll generate them as needed or use a catch-all if I wanted to, however the user asked for "pages" for each.
// I'll create the files one by one to ensure routing works.

export default GenericComingSoon;

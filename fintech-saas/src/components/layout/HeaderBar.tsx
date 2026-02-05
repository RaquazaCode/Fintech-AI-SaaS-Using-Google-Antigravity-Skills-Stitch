'use client';

interface HeaderBarProps {
    unrealizedProfit?: number;
    realizedProfit?: number;
    balance?: number;
    availableMargin?: number;
}

export default function HeaderBar({
    unrealizedProfit = 2456.89,
    realizedProfit = 12890.45,
    balance = 124830.00,
    availableMargin = 98450.00,
}: HeaderBarProps) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        }).format(value);
    };

    const formatProfit = (value: number) => {
        const prefix = value >= 0 ? '+' : '';
        return prefix + formatCurrency(value);
    };

    return (
        <header className="h-[72px] bg-bg-secondary border-b border-border-primary flex items-center justify-between px-8">
            {/* Left Section - Portfolio Stats */}
            <div className="flex items-center gap-8">
                {/* Account Selector */}
                <div className="flex items-center gap-2 cursor-pointer hover:bg-bg-primary rounded-lg px-3 py-2 transition-colors">
                    <span className="text-sm text-text-secondary">Portfolio</span>
                    <span className="text-sm font-medium">Main Account</span>
                    <svg className="w-4 h-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                {/* Divider */}
                <div className="h-8 w-px bg-border-primary" />

                {/* Stats */}
                <div className="flex items-center gap-6">
                    <StatItem
                        label="Unrealized profit"
                        value={formatProfit(unrealizedProfit)}
                        isPositive={unrealizedProfit >= 0}
                    />
                    <StatItem
                        label="Realized profit"
                        value={formatProfit(realizedProfit)}
                        isPositive={realizedProfit >= 0}
                    />
                    <StatItem
                        label="Balance"
                        value={formatCurrency(balance)}
                    />
                    <StatItem
                        label="Available margin"
                        value={formatCurrency(availableMargin)}
                    />
                </div>
            </div>

            {/* Right Section - User Info */}
            <div className="flex items-center gap-6">
                {/* Protected Trades Indicator */}
                <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-text-secondary">Protected trades</span>
                    <span className="text-success font-medium">12</span>
                </div>

                {/* Divider */}
                <div className="h-8 w-px bg-border-primary" />

                {/* Greeting */}
                <div className="text-sm">
                    <span className="text-text-secondary">Good afternoon, </span>
                    <span className="font-medium">Chris</span>
                </div>

                {/* Notifications */}
                <button className="relative p-2 hover:bg-bg-primary rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-accent-coral rounded-full" />
                </button>
            </div>
        </header>
    );
}

interface StatItemProps {
    label: string;
    value: string;
    isPositive?: boolean;
}

function StatItem({ label, value, isPositive }: StatItemProps) {
    const valueColor = isPositive !== undefined
        ? isPositive ? 'text-success' : 'text-accent-coral'
        : 'text-text-primary';

    return (
        <div className="flex flex-col">
            <span className="text-xs text-text-secondary">{label}</span>
            <span className={`text-sm font-semibold ${valueColor}`}>{value}</span>
        </div>
    );
}

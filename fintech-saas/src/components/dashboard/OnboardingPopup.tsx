'use client';

import { useState, useEffect } from 'react';

interface Category {
    id: string;
    label: string;
    emoji: string;
}

const CATEGORIES: Category[] = [
    { id: 'ai', label: 'AI & Tech', emoji: '🚀' },
    { id: 'green', label: 'Green Energy', emoji: '🌿' },
    { id: 'biotech', label: 'BioTech', emoji: '💊' },
    { id: 'fintech', label: 'Fintech', emoji: '💳' },
    { id: 'energy', label: 'Energy', emoji: '⚡' },
    { id: 'consumer', label: 'Consumer', emoji: '🛍️' },
    { id: 'industrial', label: 'Industrial', emoji: '🏭' },
];

export default function OnboardingPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [name, setName] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
        const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
        if (!hasCompletedOnboarding) {
            setIsVisible(true);
        }
    }, []);

    const toggleCategory = (id: string) => {
        setSelectedCategories(prev => {
            if (prev.includes(id)) {
                return prev.filter(c => c !== id);
            }
            if (prev.length >= 4) return prev; // Max 4 items
            return [...prev, id];
        });
    };

    const handleProceed = () => {
        if (!name.trim() || selectedCategories.length === 0) return;

        localStorage.setItem('user_name', name.trim());
        localStorage.setItem('user_interests', JSON.stringify(selectedCategories));
        localStorage.setItem('onboarding_completed', 'true');

        // Dispatch custom event to notify other components (like HeaderBar)
        window.dispatchEvent(new Event('onboarding_updated'));

        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            {/* Blurred Backdrop */}
            <div className="absolute inset-0 bg-bg-primary/40 backdrop-blur-xl transition-all duration-700" />

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-white/80 dark:bg-bg-elevated/80 border border-white/20 shadow-2xl rounded-3xl p-8 backdrop-blur-2xl transform transition-all duration-500 scale-100 animate-in fade-in zoom-in">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent-blue to-accent-purple rounded-2xl flex items-center justify-center text-3xl shadow-lg mx-auto mb-4 animate-bounce">
                        🃏
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">Welcome to TradeJester</h2>
                    <p className="text-text-secondary text-sm mt-2">Let's personalize your trading experience</p>
                </div>

                <div className="space-y-6">
                    {/* Name Input */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2 ml-1">
                            Your Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Chris Johnson"
                            className="w-full px-5 py-4 rounded-2xl bg-bg-secondary border border-border-primary focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/10 transition-all outline-none font-medium"
                        />
                    </div>

                    {/* Category Selection */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-3 ml-1">
                            Interests (Select 1-4)
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => toggleCategory(cat.id)}
                                    className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 border ${selectedCategories.includes(cat.id)
                                            ? 'bg-accent-blue border-accent-blue text-white shadow-md shadow-accent-blue/20 transform scale-105'
                                            : 'bg-bg-secondary border-border-primary text-text-secondary hover:border-text-secondary'
                                        }`}
                                >
                                    <span>{cat.emoji}</span>
                                    <span>{cat.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Proceed Button */}
                    <button
                        onClick={handleProceed}
                        disabled={!name.trim() || selectedCategories.length === 0}
                        className="w-full py-4 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-2xl font-bold text-lg shadow-xl shadow-accent-blue/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all"
                    >
                        Enter Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}

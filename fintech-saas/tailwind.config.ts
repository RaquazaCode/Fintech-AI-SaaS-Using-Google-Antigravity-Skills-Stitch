import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary backgrounds
                "bg-primary": "#0B0F14",
                "bg-secondary": "#11161D",
                "bg-card": "#141B23",
                "bg-elevated": "#1A222C",

                // Border colors
                "border-primary": "#1B2430",
                "border-secondary": "#2A3441",

                // Text colors
                "text-primary": "#FFFFFF",
                "text-secondary": "#8892A0",
                "text-muted": "#5A6573",

                // Accent colors
                "accent-blue": "#3B82F6",
                "accent-teal": "#14B8A6",
                "accent-coral": "#F97066",
                "accent-purple": "#8B5CF6",

                // Semantic colors
                "success": "#22C55E",
                "warning": "#F59E0B",
                "error": "#EF4444",
                "info": "#3B82F6",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "Inter", "SF Pro Display", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
                display: ["var(--font-inter)", "Inter", "Circular", "SF Pro Display", "sans-serif"],
            },
            borderRadius: {
                "card": "16px",
                "button": "8px",
                "input": "8px",
            },
            spacing: {
                "card-padding": "24px",
                "section-gap": "24px",
                "header-height": "72px",
                "sidebar-width": "260px",
            },
            boxShadow: {
                "card": "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)",
                "elevated": "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.3)",
            },
        },
    },
    plugins: [],
};

export default config;

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
                "bg-primary": "#F4F9FF",
                "bg-secondary": "#FFFFFF",
                "bg-card": "#FFFFFF",
                "bg-elevated": "#FFFFFF",

                // Border colors
                "border-primary": "#E3E6ED",
                "border-secondary": "#D1D5DB",

                // Text colors
                "text-primary": "#121D28",
                "text-secondary": "#626E7A",
                "text-muted": "#99A2A9",

                // Accent colors
                "accent-blue": "#0082FF",
                "accent-teal": "#00B29C",
                "accent-coral": "#FF6363",
                "accent-purple": "#8B5CF6",

                // Semantic colors
                "success": "#00B29C",
                "warning": "#F59E0B",
                "error": "#FF6363",
                "info": "#2BBCFF",
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

# Financial Advisor SaaS Platform

A modern trading platform dashboard built with Next.js 14, TypeScript, and Tailwind CSS, powered by the Finnhub API.

## Features

- 📊 Real-time stock quotes via WebSocket
- 📈 Interactive charting with OHLCV data
- 📰 Live market news feeds
- 📅 Economic calendar integration
- 🎨 Premium dark theme UI

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Data**: Finnhub API (Free Tier)

## Getting Started

```bash
cd fintech-saas
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the `fintech-saas` directory:

```env
NEXT_PUBLIC_FINNHUB_API_KEY=your_api_key_here
```

Get your free API key at [finnhub.io](https://finnhub.io).

## Project Structure

```
├── Design Interface and Style/   # Figma design assets
├── fintech-saas/                 # Next.js application
│   ├── src/
│   │   ├── app/                  # App router pages
│   │   ├── components/           # React components
│   │   └── lib/                  # Utilities & API clients
│   └── ...
└── Finnhub API Free Tier...      # API documentation
```

## License

Private - All rights reserved

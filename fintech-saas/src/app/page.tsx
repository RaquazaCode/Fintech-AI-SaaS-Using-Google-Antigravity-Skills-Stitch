import { AppShell } from '@/components/layout';

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-semibold">Overview</h1>
          <p className="text-text-secondary text-sm mt-1">Your trading dashboard at a glance</p>
        </div>

        {/* Dashboard Grid - Placeholder for now */}
        <div className="grid grid-cols-3 gap-6">
          {/* My Trades - spans 2 columns */}
          <div className="col-span-2 card">
            <h2 className="text-lg font-medium mb-4">My Trades</h2>
            <p className="text-text-secondary text-sm">Loading trades...</p>
          </div>

          {/* My Watchlist */}
          <div className="card">
            <h2 className="text-lg font-medium mb-4">My Watchlist</h2>
            <p className="text-text-secondary text-sm">Loading watchlist...</p>
          </div>

          {/* Today's Top Movers - full width */}
          <div className="col-span-3 card">
            <h2 className="text-lg font-medium mb-4">Today&apos;s Top Movers</h2>
            <p className="text-text-secondary text-sm">Loading top movers...</p>
          </div>

          {/* Latest News - spans 2 columns */}
          <div className="col-span-2 card">
            <h2 className="text-lg font-medium mb-4">Latest News</h2>
            <p className="text-text-secondary text-sm">Loading news...</p>
          </div>

          {/* Upcoming Events */}
          <div className="card">
            <h2 className="text-lg font-medium mb-4">Upcoming Events</h2>
            <p className="text-text-secondary text-sm">Loading events...</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

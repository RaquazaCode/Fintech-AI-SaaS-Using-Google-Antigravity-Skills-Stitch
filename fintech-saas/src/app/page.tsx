import { AppShell } from '@/components/layout';
import {
  TradesTable,
  WatchlistPanel,
  TopMovers,
  NewsPanel,
  EventsTable,
  OnboardingPopup,
} from '@/components/dashboard';

export default function HomePage() {
  return (
    <AppShell>
      <OnboardingPopup />
      <div className="space-y-6">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-semibold">Overview</h1>
          <p className="text-text-secondary text-sm mt-1">Your trading dashboard at a glance</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* My Trades - spans 2 columns */}
          <div className="col-span-2">
            <TradesTable />
          </div>

          {/* My Watchlist */}
          <div>
            <WatchlistPanel />
          </div>

          {/* Today's Top Movers - full width */}
          <div className="col-span-3">
            <TopMovers />
          </div>

          {/* Latest News - spans 2 columns */}
          <div className="col-span-2">
            <NewsPanel />
          </div>

          {/* Upcoming Events */}
          <div>
            <EventsTable />
          </div>
        </div>
      </div>
    </AppShell>
  );
}

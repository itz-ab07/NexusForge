import { ActiveRoomsPanel } from "./ActiveRoomsPanel";
import { ActivityFeedPanel } from "./ActivityFeedPanel";
import { AiSuggestionsPanel } from "./AiSuggestionsPanel";
import { DashboardHeader } from "./DashboardHeader";
import { StatsRow } from "./StatsRow";
import { TeamLeaderboardPanel } from "./TeamLeaderboardPanel";
import { TeamPulsePanel } from "./TeamPulsePanel";
import { UpcomingContestsPanel } from "./UpcomingContestsPanel";

export function DashboardPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pt-32 pb-20">
      <DashboardHeader />
      <StatsRow />
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <ActiveRoomsPanel />
        <AiSuggestionsPanel />
        <UpcomingContestsPanel />
        <TeamLeaderboardPanel />
        <ActivityFeedPanel />
        <TeamPulsePanel />
      </div>
    </main>
  );
}

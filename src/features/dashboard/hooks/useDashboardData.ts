import { useEffect, useState } from "react";
import {
  DASHBOARD_UPDATE_EVENT,
  getActivityFeed,
  getConnectedAccounts,
  getRecentRooms,
  type ActivityEntry,
  type ConnectedAccounts,
  type RecentRoom,
} from "@/features/dashboard/lib/dashboard-storage";

type DashboardData = {
  accounts: ConnectedAccounts;
  recentRooms: RecentRoom[];
  activity: ActivityEntry[];
};

function readDashboardData(): DashboardData {
  return {
    accounts: getConnectedAccounts(),
    recentRooms: getRecentRooms(),
    activity: getActivityFeed(),
  };
}

export function useDashboardData(): DashboardData {
  const [data, setData] = useState<DashboardData>(readDashboardData);

  useEffect(() => {
    const refresh = () => setData(readDashboardData());
    refresh();
    window.addEventListener(DASHBOARD_UPDATE_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(DASHBOARD_UPDATE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return data;
}

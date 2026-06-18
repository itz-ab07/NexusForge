export type ConnectedAccounts = {
  codeforces?: string;
  leetcode?: string;
};

export type RecentRoom = {
  id: string;
  language: string;
  joinedAt: number;
};

export type ActivityEntry = {
  who: string;
  what: string;
  subj: string;
  at: number;
};

const ACCOUNTS_KEY = "nexus_connected_accounts";
const ROOMS_KEY = "nexus_recent_rooms";
const ACTIVITY_KEY = "nexus_activity_feed";
const MAX_RECENT_ROOMS = 10;
const MAX_ACTIVITY = 20;

export const DASHBOARD_UPDATE_EVENT = "nexus-dashboard-update";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function dispatchDashboardUpdate() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(DASHBOARD_UPDATE_EVENT));
}

export function getConnectedAccounts(): ConnectedAccounts {
  return readJson<ConnectedAccounts>(ACCOUNTS_KEY, {});
}

export function setConnectedAccount(platform: keyof ConnectedAccounts, handle: string) {
  const accounts = getConnectedAccounts();
  accounts[platform] = handle.trim();
  writeJson(ACCOUNTS_KEY, accounts);
  dispatchDashboardUpdate();
}

export function disconnectAccount(platform: keyof ConnectedAccounts) {
  const accounts = getConnectedAccounts();
  delete accounts[platform];
  writeJson(ACCOUNTS_KEY, accounts);
  dispatchDashboardUpdate();
}

export function getRecentRooms(): RecentRoom[] {
  return readJson<RecentRoom[]>(ROOMS_KEY, []);
}

export function getActivityFeed(): ActivityEntry[] {
  return readJson<ActivityEntry[]>(ACTIVITY_KEY, []);
}

export function recordRoomJoin(roomId: string, language: string, userName: string) {
  const rooms = getRecentRooms().filter((r) => r.id !== roomId);
  rooms.unshift({ id: roomId, language, joinedAt: Date.now() });
  writeJson(ROOMS_KEY, rooms.slice(0, MAX_RECENT_ROOMS));

  const activity = getActivityFeed();
  activity.unshift({
    who: userName,
    what: "joined",
    subj: `room-${roomId}`,
    at: Date.now(),
  });
  writeJson(ACTIVITY_KEY, activity.slice(0, MAX_ACTIVITY));

  dispatchDashboardUpdate();
}

export function formatRelativeTime(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

export function languageLabel(language: string) {
  return language === "python" ? "Python" : "C++";
}

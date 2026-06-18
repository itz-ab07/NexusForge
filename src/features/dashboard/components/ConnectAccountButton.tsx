import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  disconnectAccount,
  setConnectedAccount,
  type ConnectedAccounts,
} from "@/features/dashboard/lib/dashboard-storage";

type Platform = keyof ConnectedAccounts;

const platformLabels: Record<Platform, string> = {
  codeforces: "Codeforces",
  leetcode: "LeetCode",
};

export function ConnectAccountButton({
  platform,
  connectedHandle,
  className = "text-neon-cyan hover:underline text-xs",
}: {
  platform: Platform;
  connectedHandle?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [handle, setHandle] = useState(connectedHandle ?? "");

  const label = platformLabels[platform];

  const openDialog = () => {
    setHandle(connectedHandle ?? "");
    setOpen(true);
  };

  const save = () => {
    const trimmed = handle.trim();
    if (!trimmed) return;
    setConnectedAccount(platform, trimmed);
    setOpen(false);
  };

  const disconnect = () => {
    disconnectAccount(platform);
    setOpen(false);
  };

  return (
    <>
      <button type="button" onClick={openDialog} className={className}>
        {connectedHandle ? `@${connectedHandle}` : `Connect ${label}`}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="glass-strong border-border/50 bg-card text-foreground sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{connectedHandle ? `Manage ${label}` : `Connect ${label}`}</DialogTitle>
            <DialogDescription>
              {connectedHandle
                ? `Your ${label} handle is saved locally on this device.`
                : `Enter your ${label} username to link your account.`}
            </DialogDescription>
          </DialogHeader>

          <input
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder={`${label} handle`}
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-neon-cyan/40"
          />

          <DialogFooter className="gap-2 sm:gap-0">
            {connectedHandle && (
              <button
                type="button"
                onClick={disconnect}
                className="rounded-lg border border-white/10 px-4 py-2 text-xs text-muted-foreground hover:bg-white/5 transition"
              >
                Disconnect
              </button>
            )}
            <button
              type="button"
              onClick={save}
              disabled={!handle.trim()}
              className="rounded-lg bg-gradient-primary px-4 py-2 text-xs font-semibold text-white glow-purple hover:opacity-90 transition disabled:opacity-50"
            >
              {connectedHandle ? "Update handle" : "Connect"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

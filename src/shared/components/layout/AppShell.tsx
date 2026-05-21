import type { ReactNode } from "react";
import { Navbar } from "./Navbar";

type AppShellProps = {
  children: ReactNode;
  /** Dashboard uses navbar; room uses its own header */
  showNavbar?: boolean;
};

export function AppShell({ children, showNavbar = true }: AppShellProps) {
  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}

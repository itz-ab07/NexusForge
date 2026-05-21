export function AuthLoadingScreen() {
  return (
    <div className="flex min-h-[40vh] w-full items-center justify-center">
      <div
        className="h-9 w-9 animate-spin rounded-full border-2 border-[oklch(0.7_0.22_285)] border-t-transparent"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}

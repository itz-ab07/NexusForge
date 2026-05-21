type AuthMessageProps = {
  message: string;
  variant?: "error" | "success";
};

export function AuthMessage({ message, variant = "error" }: AuthMessageProps) {
  if (!message) return null;

  const styles =
    variant === "success"
      ? "border-[oklch(0.7_0.18_150/0.4)] bg-[oklch(0.7_0.18_150/0.1)] text-status-success"
      : "border-destructive/40 bg-destructive/10 text-destructive-foreground";

  return (
    <p
      role="alert"
      className={`rounded-lg border px-3 py-2.5 text-sm leading-snug ${styles}`}
    >
      {message}
    </p>
  );
}

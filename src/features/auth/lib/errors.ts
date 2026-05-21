export function getAuthErrorMessage(error: unknown): string {
  if (!error || typeof error !== "object") {
    return "Something went wrong. Please try again.";
  }

  const message =
    "message" in error && typeof error.message === "string" ? error.message : "";

  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "Invalid email or password.";
  }
  if (normalized.includes("email not confirmed")) {
    return "Please confirm your email before signing in.";
  }
  if (normalized.includes("user already registered")) {
    return "An account with this email already exists.";
  }
  if (normalized.includes("password should be at least")) {
    return "Password must be at least 6 characters.";
  }
  if (normalized.includes("unable to validate email")) {
    return "Please enter a valid email address.";
  }
  if (normalized.includes("signup is disabled")) {
    return "Sign up is currently disabled. Contact support.";
  }

  return message || "Something went wrong. Please try again.";
}

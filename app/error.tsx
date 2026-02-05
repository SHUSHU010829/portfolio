"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="font-primary text-4xl text-destructive">
          {"// Error"}
        </div>
        <h2 className="font-secondary text-lg text-foreground">
          Something went wrong!
        </h2>
        <p className="max-w-md font-secondary text-sm text-muted-foreground">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <button
          onClick={reset}
          className="mt-4 rounded border border-border bg-secondary px-6 py-2.5 font-primary text-sm text-foreground transition-colors hover:bg-primary hover:text-background"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

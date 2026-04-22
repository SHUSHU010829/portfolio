export default function Footer() {
  const currentYear = new Date().getFullYear()
  const version = process.env.NEXT_PUBLIC_VERSION ?? '0.1.0'
  const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME

  const lastUpdated = buildTime
    ? new Date(buildTime).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null

  return (
    <footer className="mt-auto flex w-full flex-col items-center gap-4 border-t border-border px-10 py-10">
      <p className="font-mono text-sm font-semibold text-accent">$ exit 0</p>
      <div className="flex flex-col items-center gap-1">
        <p className="font-mono text-center text-xs text-fg-muted">
          © {currentYear} SHUU
        </p>
        <p className="font-mono text-center text-xs text-fg-subtle">
          v{version}{lastUpdated && ` · updated ${lastUpdated}`}
        </p>
      </div>
    </footer>
  )
}

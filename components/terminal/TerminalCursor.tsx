type TerminalCursorProps = {
  /** 游標字元，預設 `_` */
  char?: string
  className?: string
}

export function TerminalCursor({ char = '_', className }: TerminalCursorProps) {
  return (
    <span
      className={`inline-block animate-blink-cursor text-accent ${className ?? ''}`}
      aria-hidden="true"
    >
      {char}
    </span>
  )
}

import type { MDXComponents } from 'mdx/types'
import { QuickFacts } from '@/components/mdx/QuickFacts'
import { Highlight } from '@/components/mdx/Highlight'
import { Callout } from '@/components/mdx/Callout'
import { Diagram } from '@/components/mdx/Diagram'
import { CodeBlock } from '@/components/terminal/CodeBlock'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom components available in MDX files
    QuickFacts,
    Highlight,
    Callout,
    Diagram,
    CodeBlock,

    // Override default HTML elements for terminal aesthetic
    h1: ({ children }) => (
      <h1 className="font-mono text-2xl font-semibold text-fg mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-mono text-xl font-semibold text-fg mt-8 mb-3">
        <span className="text-accent">// </span>{children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-mono text-lg font-semibold text-fg mt-6 mb-2">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="font-mono text-sm text-fg-muted leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 flex flex-col gap-1">{children}</ul>
    ),
    li: ({ children }) => (
      <li className="flex items-start gap-2 font-mono text-sm text-fg-muted">
        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
        <span>{children}</span>
      </li>
    ),
    code: ({ children }) => (
      <code className="rounded bg-bg-overlay px-1 py-0.5 font-mono text-xs text-accent">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mb-4 overflow-x-auto rounded-none border border-border bg-bg-elevated p-4 font-mono text-xs text-fg">
        {children}
      </pre>
    ),
    hr: () => <hr className="my-8 border-border" />,
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-accent hover:text-accent-hover transition-colors duration-fast underline underline-offset-2"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),

    ...components,
  }
}

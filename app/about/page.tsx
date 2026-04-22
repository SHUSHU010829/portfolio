import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt'
import { Toolbox } from './Toolbox'
import { Timeline } from './Timeline'

export const metadata: Metadata = {
  title: 'About',
  description: 'Frontend engineer building at the intersection of design and code. Based in Taipei.',
  openGraph: {
    title: '$ whoami — shu/dev',
    description: 'Frontend engineer building at the intersection of design and code.',
  },
}

const NOW_UPDATED = '2026-04-23'

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Navbar />
      <main className="flex flex-col gap-14 px-10 pb-10 pt-10">
        <TerminalPrompt className="text-sm text-fg-muted">
          cat about.md
        </TerminalPrompt>

        {/* Story */}
        <section aria-label="Story" className="flex flex-col gap-5">
          <h2 className="font-mono text-xs text-fg-subtle">// story</h2>

          <div className="flex flex-col gap-4 font-mono text-sm leading-relaxed text-fg-muted">
            <p>
              I started in iOS. The early days were Swift UI, SwiftUI, and a lot of AutoLayout headaches —
              but it taught me to think about interfaces at the component level before I ever touched CSS.
            </p>
            <p>
              The switch to frontend happened organically: I was building the web companion for a client's
              iOS app (that's{' '}
              <Link href="/work/dailyval" className="text-accent hover:text-accent-hover transition-colors duration-fast">
                DailyVal
              </Link>
              ), and realized the gap between what design hands off and what code produces is a design problem,
              not an engineering one. That framing changed how I work.
            </p>
            <p>
              I've been running design and engineering in parallel ever since — not as separate disciplines,
              but as one loop. The constraint informs the interface; the interface reveals the constraint.
            </p>
            <p>
              Currently based in Taipei. Open to remote-first roles and interesting problems.
            </p>
          </div>
        </section>

        {/* Now */}
        <section aria-label="Now" className="flex flex-col gap-4">
          <h2 className="font-mono text-xs text-fg-subtle">// now</h2>
          <p className="font-mono text-xs text-fg-subtle">
            last updated: {NOW_UPDATED}
          </p>
          <ul className="flex flex-col gap-2 font-mono text-sm text-fg-muted">
            {[
              'Building this portfolio — v2, shipped 2026',
              'Studying WebGL + Three.js patterns (hence the /sudo room)',
              'Reading: Designing Data-Intensive Applications',
              'Listening: a lot of lo-fi and city pop',
            ].map(item => (
              <li key={item} className="flex gap-2">
                <span className="text-accent shrink-0">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* How I Work */}
        <section aria-label="How I work" className="flex flex-col gap-4">
          <h2 className="font-mono text-xs text-fg-subtle">// how i work</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                label: 'Design first',
                desc: 'I prototype in Figma before writing a single line. Implementation should be boring.',
              },
              {
                label: 'Measure twice',
                desc: 'Performance is a feature. Bundle size, LCP, CLS — these get checked, not assumed.',
              },
              {
                label: 'Accessibility as default',
                desc: 'Not an afterthought. Every component I ship is keyboard-navigable and screen-reader friendly.',
              },
              {
                label: 'Show, not tell',
                desc: 'This site is the argument. The code is public. The decisions are in the commit messages.',
              },
            ].map(({ label, desc }) => (
              <div key={label} className="flex flex-col gap-2 border border-border p-4">
                <span className="font-mono text-xs font-semibold text-accent">{label}</span>
                <span className="font-mono text-xs text-fg-muted leading-relaxed">{desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Toolbox */}
        <section id="toolbox" aria-label="Toolbox" className="flex flex-col gap-4">
          <h2 className="font-mono text-xs text-fg-subtle">// toolbox</h2>
          <Toolbox />
        </section>

        {/* Beyond Code */}
        <section aria-label="Beyond code" className="flex flex-col gap-4">
          <h2 className="font-mono text-xs text-fg-subtle">// beyond code</h2>
          <div className="flex flex-col gap-2 font-mono text-sm text-fg-muted">
            {[
              ['🎮', 'Valorant — peaked Diamond, currently Iron (long story)'],
              ['🎵', 'Lo-fi, city pop, and anything in 432Hz'],
              ['☕', 'Specialty coffee — light roast, pour-over'],
              ['🐕', "Dog dad (that's Tapi — try the idle easter egg)"],
            ].map(([icon, text]) => (
              <p key={text}>
                <span className="mr-2">{icon}</span>
                {text}
              </p>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section aria-label="Timeline" className="flex flex-col gap-6">
          <h2 className="font-mono text-xs text-fg-subtle">// timeline</h2>
          <Timeline />
        </section>

        {/* Links */}
        <section aria-label="Links out" className="flex flex-col gap-3 border-t border-border pt-6">
          <p className="font-mono text-xs text-fg-subtle">// see also</p>
          <div className="flex flex-wrap gap-4 font-mono text-sm">
            <Link href="/work" className="text-fg-muted hover:text-accent transition-colors duration-fast">
              → /work
            </Link>
            <Link href="/play" className="text-fg-muted hover:text-accent transition-colors duration-fast">
              → /play
            </Link>
            <Link href="/stream" className="text-fg-muted hover:text-accent transition-colors duration-fast">
              → /stream
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

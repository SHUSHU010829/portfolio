'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

const EVENTS = [
  {
    year: '2020',
    label: 'NCCU',
    desc: 'Started Computer Science at National Chengchi University. First iOS app shipped.',
  },
  {
    year: '2022',
    label: 'SoftMobile',
    href: '/work/softmobile',
    desc: 'iOS engineer internship. Shipped features to 50K+ users.',
  },
  {
    year: '2023',
    label: 'Relianz',
    href: '/work/relianz',
    desc: 'Frontend contractor. Built full design system from scratch.',
  },
  {
    year: '2025',
    label: 'DailyVal',
    href: '/work/dailyval',
    desc: 'Full-stack web + iOS contractor. Apple CloudKit meets Next.js.',
  },
  {
    year: '2026',
    label: '?',
    desc: 'Next chapter. Open to interesting problems.',
  },
]

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ['0%', '100%'])

  return (
    <div ref={containerRef} className="relative flex flex-col gap-0">
      {/* Animated line */}
      <div className="absolute left-[5.5rem] top-0 h-full w-px bg-border">
        <motion.div
          className="absolute top-0 left-0 w-full bg-accent"
          style={{ height: lineHeight }}
        />
      </div>

      {EVENTS.map((event, i) => (
        <motion.div
          key={event.year}
          className="flex gap-6 py-5"
          initial={{ opacity: 0, x: -4 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.16, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex w-20 shrink-0 flex-col items-end">
            <span className="font-mono text-xs text-fg-subtle">{event.year}</span>
          </div>

          {/* Dot */}
          <div className="relative flex items-start pt-0.5">
            <div className={cn(
              'h-2.5 w-2.5 shrink-0 rounded-full border-2',
              event.year === '2026'
                ? 'border-accent bg-accent-dim'
                : 'border-border bg-bg',
            )} />
          </div>

          <div className="flex flex-col gap-1 pb-2">
            {event.href ? (
              <a
                href={event.href}
                className="font-mono text-sm font-semibold text-fg hover:text-accent transition-colors duration-fast"
              >
                {event.label}
              </a>
            ) : (
              <span className={cn(
                'font-mono text-sm font-semibold',
                event.year === '2026' ? 'text-accent' : 'text-fg',
              )}>
                {event.label}
              </span>
            )}
            <p className="font-mono text-xs text-fg-muted leading-relaxed">{event.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

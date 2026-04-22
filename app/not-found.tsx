'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Suspense } from 'react'

const Physics404 = dynamic(() => import('@/components/ui/Physics404').then(m => ({ default: m.Physics404 })), {
  ssr: false,
})

function StaticFallback() {
  return (
    <div className="flex h-48 items-center justify-center">
      <span className="font-mono text-6xl font-bold text-fg-muted">404</span>
    </div>
  )
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-8 font-mono">
      <Suspense fallback={<StaticFallback />}>
        <Physics404 />
      </Suspense>

      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-sm text-fg-muted">
          {'>'} page not found. maybe try:
        </p>
        <Link
          href="/"
          className="text-sm text-accent hover:text-accent-hover transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          cd /
        </Link>
      </div>
    </div>
  )
}

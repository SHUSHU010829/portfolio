'use client'

import { useEffect, useRef } from 'react'
import Matter from 'matter-js'

const DIGIT_LABELS = ['4', '0', '4']

export function Physics404() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<Matter.Engine | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const W = Math.min(window.innerWidth - 80, 500)
    const H = 220

    canvas.width = W
    canvas.height = H

    const engine = Matter.Engine.create({ gravity: { y: 1.2 } })
    engineRef.current = engine

    const render = Matter.Render.create({
      canvas,
      engine,
      options: {
        width: W,
        height: H,
        wireframes: false,
        background: 'transparent',
      },
    })

    // Floor
    const floor = Matter.Bodies.rectangle(W / 2, H + 25, W * 2, 50, {
      isStatic: true,
      render: { fillStyle: 'transparent', strokeStyle: 'transparent' },
    })

    // Left / right walls
    const wallL = Matter.Bodies.rectangle(-25, H / 2, 50, H * 2, {
      isStatic: true,
      render: { fillStyle: 'transparent', strokeStyle: 'transparent' },
    })
    const wallR = Matter.Bodies.rectangle(W + 25, H / 2, 50, H * 2, {
      isStatic: true,
      render: { fillStyle: 'transparent', strokeStyle: 'transparent' },
    })

    // Digit bodies — rounded rectangles
    const spacing = W / 4
    const digits = DIGIT_LABELS.map((_, i) =>
      Matter.Bodies.rectangle(spacing * (i + 1), -60, 80, 90, {
        restitution: 0.5,
        friction: 0.3,
        frictionAir: 0.02,
        render: {
          fillStyle: 'oklch(0.16 0 0)',
          strokeStyle: 'oklch(0.22 0 0)',
          lineWidth: 1,
        },
        label: `digit-${i}`,
      }),
    )

    Matter.Composite.add(engine.world, [floor, wallL, wallR, ...digits])

    // Mouse drag
    const mouse = Matter.Mouse.create(canvas)
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    })
    Matter.Composite.add(engine.world, mouseConstraint)

    const runner = Matter.Runner.create()
    Matter.Runner.run(runner, engine)
    Matter.Render.run(render)

    // Draw digit labels on top of bodies
    Matter.Events.on(render, 'afterRender', () => {
      const ctx = render.context
      digits.forEach((body, i) => {
        ctx.save()
        ctx.translate(body.position.x, body.position.y)
        ctx.rotate(body.angle)
        ctx.font = 'bold 52px monospace'
        ctx.fillStyle = 'oklch(0.78 0.18 155)'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(DIGIT_LABELS[i], 0, 2)
        ctx.restore()
      })
    })

    return () => {
      Matter.Runner.stop(runner)
      Matter.Render.stop(render)
      Matter.Engine.clear(engine)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="block"
      aria-label="404 — interactive physics digits"
      role="img"
    />
  )
}

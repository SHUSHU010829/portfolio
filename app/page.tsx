'use client'

import Navbar from '@/components/navbar'
import Overview from '@/components/overview'
import SocialLinks from '@/components/social-links'
import About from '@/components/about'
import Experience from '@/components/experience'
import Projects from '@/components/projects'
import Footer from '@/components/footer'
import { Hero } from '@/components/sections/Hero'
import { motion } from 'motion/react'

const sectionVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0 },
}

const transition = (delay: number) => ({
  duration: 0.16,
  delay,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
})

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Navbar />
      <Hero />
      <main className="flex flex-col gap-10 px-10 pb-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={transition(0.1)}
        >
          <Overview />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={transition(0.15)}
        >
          <SocialLinks />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={transition(0.2)}
        >
          <About />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={transition(0.25)}
        >
          <Experience />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={transition(0.3)}
        >
          <Projects />
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}

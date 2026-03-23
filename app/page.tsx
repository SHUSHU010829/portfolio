"use client";

import Navbar from "@/components/navbar";
import Overview from "@/components/overview";
import SocialLinks from "@/components/social-links";
import About from "@/components/about";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
// import Certifications from "@/components/certifications";
import Footer from "@/components/footer";
import { motion } from "motion/react";

export default function Home() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex flex-col gap-10 px-10 pb-10 pt-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
        >
          <Overview />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
        >
          <SocialLinks />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
        >
          <About />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
        >
          <Experience />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          <Projects />
        </motion.div>
        {/* <Certifications /> */}
      </main>
      <Footer />
    </div>
  );
}

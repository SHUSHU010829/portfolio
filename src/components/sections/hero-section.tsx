'use client';

import { motion } from 'framer-motion';
import { Play, CheckCircle2, MapPin } from 'lucide-react';
// Remove unused import
import Image from 'next/image';

export function HeroSection() {
  const playPronunciation = () => {
    const utterance = new SpeechSynthesisUtterance('Shuayuan Chuang');
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-white text-6xl font-bold">SC</div>
                </div>
                {/* Taiwan Flag Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="absolute -top-2 -right-2 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center shadow-xl"
                >
                  <span className="text-2xl">🇹🇼</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            {/* Name and Verification */}
            <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white">
                Shuayuan
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Chuang
                </span>
              </h1>
              <div className="flex flex-col space-y-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                >
                  <CheckCircle2 size={20} className="text-white" />
                </motion.div>
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  onClick={playPronunciation}
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label="Play pronunciation"
                >
                  <Play size={16} className="text-white ml-0.5" />
                </motion.button>
              </div>
            </div>

            {/* Tagline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl lg:text-3xl text-gray-300 font-light mb-8"
            >
              Creating with code. <br />
              <span className="text-white font-medium">Small details matter.</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg text-gray-400 leading-relaxed max-w-2xl"
            >
              Passionate frontend developer based in Taiwan, specializing in React, TypeScript, and modern web technologies.
              I believe that great user experiences are built through attention to detail and clean, maintainable code.
            </motion.p>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start space-x-2 mt-8 text-gray-300"
            >
              <MapPin size={18} />
              <span>Taipei, Taiwan</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mt-12 justify-center lg:justify-start"
            >
              <a
                href="#projects"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-medium hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-2xl font-medium hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                Get In Touch
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
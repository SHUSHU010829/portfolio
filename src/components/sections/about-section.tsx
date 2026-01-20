'use client';

import { motion } from 'framer-motion';
import { Code2, Palette, Zap, Heart, Target, Rocket } from 'lucide-react';

export function AboutSection() {
  const aboutItems = [
    {
      icon: Code2,
      title: '5+ Years Experience',
      description: 'Professional frontend development with modern frameworks and tools',
    },
    {
      icon: Palette,
      title: 'Design-First Approach',
      description: 'Creating beautiful, intuitive interfaces that users love',
    },
    {
      icon: Zap,
      title: 'Performance Optimized',
      description: 'Building fast, efficient applications with best practices',
    },
    {
      icon: Heart,
      title: 'Passionate About Quality',
      description: 'Writing clean, maintainable code that stands the test of time',
    },
    {
      icon: Target,
      title: 'Goal-Oriented',
      description: 'Focused on delivering results that exceed expectations',
    },
    {
      icon: Rocket,
      title: 'Innovation-Driven',
      description: 'Always exploring new technologies and methodologies',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white/5 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            About Me
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate frontend developer who believes that great user experiences
            come from the perfect balance of beautiful design, clean code, and thoughtful
            functionality. Every project is an opportunity to create something amazing.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {aboutItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 rounded-2xl blur-xl group-hover:from-blue-500/20 group-hover:via-purple-500/10 group-hover:to-pink-500/20 transition-all duration-500"></div>
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Personal Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
              "Small details make big differences"
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              This philosophy drives everything I do. Whether it's choosing the perfect
              animation timing, optimizing for accessibility, or ensuring pixel-perfect
              designs, I believe that attention to detail is what separates good
              products from extraordinary ones.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
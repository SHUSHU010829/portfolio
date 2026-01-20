'use client';

import { motion } from 'framer-motion';
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiVercel,
  SiFigma,
  SiGit,
} from 'react-icons/si';
import { Code, Cloud, Settings } from 'lucide-react';
import { useTheme } from 'next-themes';

export function StackSection() {
  const { theme } = useTheme();

  const techStack = [
    {
      category: 'Frontend',
      technologies: [
        {
          name: 'TypeScript',
          icon: SiTypescript,
          color: '#3178C6',
          level: 95,
        },
        {
          name: 'React',
          icon: SiReact,
          color: '#61DAFB',
          level: 90,
        },
        {
          name: 'Next.js',
          icon: SiNextdotjs,
          color: theme === 'dark' ? '#ffffff' : '#000000',
          level: 88,
        },
        {
          name: 'Tailwind CSS',
          icon: SiTailwindcss,
          color: '#06B6D4',
          level: 92,
        },
      ],
    },
    {
      category: 'Backend',
      technologies: [
        {
          name: 'Node.js',
          icon: SiNodedotjs,
          color: '#339933',
          level: 85,
        },
        {
          name: 'Python',
          icon: SiPython,
          color: '#3776AB',
          level: 75,
        },
        {
          name: 'PostgreSQL',
          icon: SiPostgresql,
          color: '#336791',
          level: 80,
        },
        {
          name: 'MongoDB',
          icon: SiMongodb,
          color: '#47A248',
          level: 78,
        },
      ],
    },
    {
      category: 'Tools & DevOps',
      technologies: [
        {
          name: 'Docker',
          icon: SiDocker,
          color: '#2496ED',
          level: 82,
        },
        {
          name: 'AWS',
          icon: Cloud,
          color: '#FF9900',
          level: 70,
        },
        {
          name: 'Vercel',
          icon: SiVercel,
          color: theme === 'dark' ? '#ffffff' : '#000000',
          level: 90,
        },
        {
          name: 'Git',
          icon: SiGit,
          color: '#F05032',
          level: 88,
        },
      ],
    },
    {
      category: 'Design & Workflow',
      technologies: [
        {
          name: 'Figma',
          icon: SiFigma,
          color: '#F24E1E',
          level: 85,
        },
        {
          name: 'VS Code',
          icon: Code,
          color: '#007ACC',
          level: 95,
        },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const techVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Tech Stack
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {techStack.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              variants={categoryVariants}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.technologies.map((tech, techIndex) => {
                    const IconComponent = tech.icon;
                    return (
                      <motion.div
                        key={tech.name}
                        variants={techVariants}
                        className="flex items-center space-x-4 group/item hover:bg-white/5 rounded-xl p-3 transition-all duration-200"
                      >
                        <div className="relative">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${tech.color}20` }}
                          >
                            <IconComponent
                              size={28}
                              style={{ color: tech.color }}
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-medium">
                              {tech.name}
                            </span>
                            <span className="text-gray-400 text-sm">
                              {tech.level}%
                            </span>
                          </div>
                          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${tech.level}%` }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 1,
                                delay: categoryIndex * 0.2 + techIndex * 0.1,
                                ease: 'easeOut',
                              }}
                              className="absolute left-0 top-0 h-full rounded-full"
                              style={{
                                background: `linear-gradient(90deg, ${tech.color}80, ${tech.color})`,
                              }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
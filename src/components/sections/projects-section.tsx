'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

export function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);

  const projects = [
    {
      title: 'E-Commerce Dashboard',
      description: 'Modern admin dashboard for e-commerce management with real-time analytics, inventory tracking, and order management.',
      longDescription: 'Built with Next.js 14, TypeScript, and Tailwind CSS. Features include real-time data visualization with Chart.js, advanced filtering and search, dark mode support, and responsive design.',
      image: '/projects/ecommerce-dashboard.jpg',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
      featured: true,
      links: {
        live: 'https://demo.example.com',
        github: 'https://github.com/username/project',
      },
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates and team collaboration features.',
      longDescription: 'Full-stack application using React, Node.js, and PostgreSQL. Includes drag-and-drop interface, real-time notifications, team collaboration, and advanced project tracking.',
      image: '/projects/task-management.jpg',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'],
      featured: true,
      links: {
        live: 'https://tasks.example.com',
        github: 'https://github.com/username/task-app',
      },
    },
    {
      title: 'Weather Forecast App',
      description: 'Beautiful weather application with detailed forecasts and interactive maps.',
      longDescription: 'React Native app with weather API integration, location services, and beautiful animations. Features include 7-day forecast, radar maps, and weather alerts.',
      image: '/projects/weather-app.jpg',
      tags: ['React Native', 'JavaScript', 'Weather API'],
      featured: false,
      links: {
        live: 'https://weather.example.com',
        github: 'https://github.com/username/weather-app',
      },
    },
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio website showcasing projects and skills with modern design.',
      longDescription: 'Built with Next.js and Framer Motion for smooth animations. Features include responsive design, dark mode, contact form, and blog integration.',
      image: '/projects/portfolio.jpg',
      tags: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
      featured: false,
      links: {
        live: 'https://portfolio.example.com',
        github: 'https://github.com/username/portfolio',
      },
    },
    {
      title: 'Cryptocurrency Tracker',
      description: 'Real-time cryptocurrency price tracking with charts and portfolio management.',
      longDescription: 'React application with real-time price updates, interactive charts, portfolio tracking, and price alerts. Uses CoinGecko API for market data.',
      image: '/projects/crypto-tracker.jpg',
      tags: ['React', 'Chart.js', 'CoinGecko API'],
      featured: false,
      links: {
        live: 'https://crypto.example.com',
        github: 'https://github.com/username/crypto-tracker',
      },
    },
    {
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media management with post scheduling and insights.',
      longDescription: 'Vue.js application with social media API integrations, analytics visualization, post scheduling, and team collaboration features.',
      image: '/projects/social-dashboard.jpg',
      tags: ['Vue.js', 'D3.js', 'Social APIs'],
      featured: false,
      links: {
        live: 'https://social.example.com',
        github: 'https://github.com/username/social-dashboard',
      },
    },
  ];

  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A selection of projects that showcase my skills and passion for creating
            exceptional digital experiences
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence>
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={projectVariants}
                layout
                className={`group relative ${
                  project.featured ? 'lg:col-span-2' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 rounded-3xl blur-xl group-hover:from-blue-500/20 group-hover:via-purple-500/10 group-hover:to-pink-500/20 transition-all duration-500"></div>
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300 group-hover:transform group-hover:scale-[1.02]">
                  {/* Project Image */}
                  <div className="relative h-64 lg:h-80 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-white text-4xl font-bold opacity-50">{project.title.slice(0, 2)}</div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Project Links */}
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                        >
                          <Github size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 lg:p-8">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-white/10 text-white text-sm rounded-full border border-white/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View Project Button */}
                    <div className="flex space-x-4">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                        >
                          <Eye size={18} />
                          <span>View Project</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show More/Less Button */}
        {projects.length > 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center space-x-2 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-medium hover:bg-white/20 transition-all duration-300"
            >
              <span>{showAll ? 'Show Less' : 'Show More Projects'}</span>
              {showAll ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
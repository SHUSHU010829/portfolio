'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import {
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaDiscord
} from 'react-icons/fa';
import { SiDailydotdev } from 'react-icons/si';

export function SocialLinksSection() {
  const socialLinks = [
    {
      name: 'X (Twitter)',
      icon: FaTwitter,
      url: 'https://twitter.com/yourusername',
      followers: '2.1k',
      description: 'Tech insights & thoughts',
      color: 'from-blue-400 to-blue-600',
      hoverColor: 'hover:shadow-blue-500/25',
    },
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/yourusername',
      followers: '1.2k',
      description: 'Open source projects',
      color: 'from-gray-600 to-gray-800',
      hoverColor: 'hover:shadow-gray-500/25',
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://linkedin.com/in/yourusername',
      followers: '856',
      description: 'Professional network',
      color: 'from-blue-600 to-blue-800',
      hoverColor: 'hover:shadow-blue-600/25',
    },
    {
      name: 'daily.dev',
      icon: SiDailydotdev,
      url: 'https://dly.to/yourusername',
      followers: '543',
      description: 'Daily tech reads',
      color: 'from-purple-500 to-purple-700',
      hoverColor: 'hover:shadow-purple-500/25',
    },
    {
      name: 'YouTube',
      icon: FaYoutube,
      url: 'https://youtube.com/@yourusername',
      followers: '324',
      description: 'Coding tutorials',
      color: 'from-red-500 to-red-700',
      hoverColor: 'hover:shadow-red-500/25',
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://instagram.com/yourusername',
      followers: '892',
      description: 'Life & behind scenes',
      color: 'from-pink-500 to-purple-600',
      hoverColor: 'hover:shadow-pink-500/25',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
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
            Let's Connect
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Follow me on social media for the latest updates and insights
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardVariants}
                className={`group relative block ${social.hoverColor}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0 rounded-2xl blur-xl group-hover:from-white/15 group-hover:to-white/5 transition-all duration-300"></div>
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg">
                        {social.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {social.followers} followers
                      </p>
                    </div>
                    <ExternalLink size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-gray-300 text-sm">
                    {social.description}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-gray-300 text-sm">Usually responds within 24 hours</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
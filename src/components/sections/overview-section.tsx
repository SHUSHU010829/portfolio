'use client';

import { motion } from 'framer-motion';
import { User, Building2, MapPin, Clock, Phone, Mail, Globe, Users } from 'lucide-react';

export function OverviewSection() {
  const overviewItems = [
    {
      icon: User,
      label: '職稱',
      value: 'Frontend Developer',
    },
    {
      icon: Building2,
      label: '公司',
      value: 'Tech Startup',
    },
    {
      icon: MapPin,
      label: '位置',
      value: 'Taipei, Taiwan',
    },
    {
      icon: Clock,
      label: '時間',
      value: 'GMT+8 (Taipei)',
    },
    {
      icon: Phone,
      label: '電話',
      value: '+886 912 345 678',
    },
    {
      icon: Mail,
      label: '郵件',
      value: 'hello@shuayuan.dev',
    },
    {
      icon: Globe,
      label: '網站',
      value: 'shuayuan.dev',
    },
    {
      icon: Users,
      label: '代詞',
      value: 'He/Him',
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Quick Overview
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Essential information about me and my professional background
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {overviewItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl blur-xl group-hover:from-white/10 group-hover:to-white/5 transition-all duration-300"></div>
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <IconComponent size={24} className="text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-400 mb-1">
                        {item.label}
                      </h3>
                      <p className="text-white font-medium break-words">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'TechCorp',
      image: '/testimonials/sarah.jpg',
      content: 'Shuayuan delivered exceptional work on our frontend project. His attention to detail and technical expertise made our product shine.',
      rating: 5,
    },
    {
      name: 'Mike Chen',
      role: 'CTO',
      company: 'StartupXYZ',
      image: '/testimonials/mike.jpg',
      content: 'Working with Shuayuan was a fantastic experience. He transformed our designs into pixel-perfect, performant web applications.',
      rating: 5,
    },
    {
      name: 'Emily Davis',
      role: 'Design Director',
      company: 'Creative Agency',
      image: '/testimonials/emily.jpg',
      content: 'Shuayuan bridges the gap between design and development beautifully. His code is clean and his execution is flawless.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white/5 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            What People Say
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Testimonials from clients and colleagues I've had the pleasure to work with
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
            >
              <Quote className="text-blue-400 mb-4" size={24} />
              <p className="text-gray-300 mb-6 leading-relaxed">
                {testimonial.content}
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
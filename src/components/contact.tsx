'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Github, Linkedin } from 'lucide-react';

export function Contact() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
          {t('title')}
        </h2>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl mx-auto">
          {t('description')}
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              {t('email')}
            </h3>
            <Button className="w-full" size="lg">
              <Mail className="mr-2 h-5 w-5" />
              contact@example.com
            </Button>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              {t('social')}
            </h3>
            <div className="flex gap-4">
              <Button variant="outline" size="lg" className="flex-1">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                <Linkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-8">
          <MessageCircle className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
            Let's build something amazing together!
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            I'm always excited to work on new projects and collaborate with talented people.
          </p>
        </div>
      </div>
    </section>
  );
}
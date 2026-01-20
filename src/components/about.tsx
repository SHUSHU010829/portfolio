'use client';

import { useTranslations } from 'next-intl';

const skills = [
  'React', 'Next.js', 'TypeScript', 'Node.js',
  'Tailwind CSS', 'PostgreSQL', 'MongoDB', 'Docker'
];

export function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-neutral-900 dark:text-neutral-100">
          {t('title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
              {t('description')}
            </p>

            <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
              {t('skills')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-white text-6xl font-bold">?</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
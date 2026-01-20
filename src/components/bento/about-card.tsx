export function AboutCard() {
  return (
    <div className="bento-card h-full p-6">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">About</h3>
        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-gray-700 dark:text-white/80 leading-relaxed">
          Passionate frontend developer with a keen eye for design and user experience.
        </p>

        <p className="text-sm text-gray-700 dark:text-white/80 leading-relaxed">
          I specialize in building modern, scalable web applications using React, TypeScript, and Next.js.
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {['UI/UX', 'Performance', 'Accessibility', 'SEO'].map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white/70 text-xs font-mono rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-xl"></div>
    </div>
  );
}
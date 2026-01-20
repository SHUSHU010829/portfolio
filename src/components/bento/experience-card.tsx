export function ExperienceCard() {
  const currentYear = new Date().getFullYear();
  const startYear = 2021;
  const experience = currentYear - startYear;

  return (
    <div className="bento-card h-full p-6 flex flex-col justify-center relative">
      <div className="text-center">
        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1 font-mono">
          {experience}+
        </div>
        <div className="text-sm text-gray-600 dark:text-white/60 font-mono uppercase tracking-wider">
          Years
        </div>
        <div className="text-xs text-gray-500 dark:text-white/40 mt-1">
          Experience
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
        </div>
        <p className="text-xs text-gray-600 dark:text-white/60 text-center mt-2 font-mono">
          Since {startYear}
        </p>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-3xl"></div>
    </div>
  );
}
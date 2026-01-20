export function SkillsCard() {
  const skills = [
    { name: 'React', level: 95, color: 'from-blue-400 to-blue-600' },
    { name: 'TypeScript', level: 90, color: 'from-blue-500 to-blue-700' },
    { name: 'Next.js', level: 88, color: 'from-gray-400 to-gray-600' },
    { name: 'Tailwind', level: 92, color: 'from-cyan-400 to-cyan-600' },
    { name: 'Node.js', level: 85, color: 'from-green-400 to-green-600' },
  ];

  return (
    <div className="bento-card h-full p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Tech Stack</h3>
      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-mono text-gray-800 dark:text-white/80">{skill.name}</span>
              <span className="text-xs text-gray-600 dark:text-white/60">{skill.level}%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
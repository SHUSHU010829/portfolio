export function ProjectsCard() {
  const projects = [
    {
      name: 'Portfolio Dashboard',
      description: 'Modern portfolio built with Next.js and Tailwind CSS',
      tech: ['Next.js', 'TypeScript', 'Tailwind'],
      status: 'Live',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration',
      tech: ['React', 'Node.js', 'Stripe'],
      status: 'Development',
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'Task Management App',
      description: 'Collaborative task management with real-time updates',
      tech: ['React', 'Firebase', 'Material-UI'],
      status: 'Completed',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="bento-card h-full p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Featured Projects</h3>
        <a
          href="/projects"
          className="text-sm text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors font-mono"
        >
          View all →
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
        {projects.map((project, index) => (
          <div
            key={project.name}
            className="bg-gray-100 dark:bg-white/5 rounded-2xl p-4 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-colors group cursor-pointer"
          >
            {/* Status badge */}
            <div className="flex justify-between items-start mb-3">
              <div
                className={`w-3 h-3 rounded-full bg-gradient-to-r ${project.color}`}
              />
              <span className="text-xs text-gray-600 dark:text-white/60 font-mono px-2 py-1 bg-gray-200 dark:bg-white/10 rounded-full">
                {project.status}
              </span>
            </div>

            {/* Project info */}
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
              {project.name}
            </h4>

            <p className="text-xs text-gray-700 dark:text-white/70 mb-3 line-clamp-2 leading-relaxed">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1">
              {project.tech.slice(0, 2).map((tech) => (
                <span
                  key={tech}
                  className="text-xs text-gray-600 dark:text-white/60 font-mono bg-gray-200 dark:bg-white/5 px-1.5 py-0.5 rounded"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 2 && (
                <span className="text-xs text-gray-500 dark:text-white/40 font-mono">
                  +{project.tech.length - 2}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-600 dark:text-white/60 font-mono">
            {projects.length} featured projects
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600 dark:text-white/60 font-mono">Active development</span>
          </div>
        </div>
      </div>
    </div>
  );
}
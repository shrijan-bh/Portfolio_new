'use client'

export default function Projects() {
  const projects = [
    {
      title: 'Data Transformation Pipeline',
      tech: ['Django', 'SQLite', 'Python'],
      description: 'End-to-end ETL solution for large-scale data processing and transformation.',
      icon: '📊',
    },
    {
      title: 'Library Management System',
      tech: ['Java', 'Spring Boot', 'Thymeleaf'],
      description: 'Full-stack library management application with advanced search and inventory tracking.',
      icon: '📚',
    },
    {
      title: 'Sahaj Security Web App',
      tech: ['React', 'Firebase', 'Tailwind'],
      description: 'Real-time security monitoring dashboard with live alerts and analytics.',
      icon: '🔐',
    },
    {
      title: 'Task Storage App',
      tech: ['React.js', 'Redux', 'Node.js'],
      description: 'Collaborative task management application with real-time synchronization.',
      icon: '✓',
    },
  ]

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 scroll-animate">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="scroll-animate group glass p-8 rounded-xl border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{project.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center scroll-animate">
          <a
            href="https://github.com/shrijan-bh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300"
          >
            View More on GitHub
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

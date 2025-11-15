'use client'

export default function Skills() {
  const skills = {
    'Programming': ['Python', 'Java', 'JavaScript', 'TypeScript'],
    'Frameworks': ['React.js', 'Next.js', 'Django', 'Spring Boot'],
    'Data & DB': ['ETL', 'PostgreSQL', 'MySQL', 'SQLite'],
    'Design': ['Figma', 'Photoshop', 'Illustrator'],
  }

  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 scroll-animate">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Skills & Expertise
          </span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(skills).map(([category, items], idx) => (
            <div
              key={category}
              className="scroll-animate"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="glass p-6 rounded-xl border border-primary/20 hover:border-primary/50 transition-all duration-300 group">
                <h3 className="text-lg font-semibold text-primary mb-4">{category}</h3>
                <div className="space-y-3">
                  {items.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 group-hover:bg-primary/10 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform"></div>
                      <span className="text-sm text-foreground">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

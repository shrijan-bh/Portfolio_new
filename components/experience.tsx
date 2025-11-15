'use client'

export default function Experience() {
  const experiences = [
    {
      title: 'Database Engineer',
      company: 'Guru Infosis Pvt. Ltd.',
      period: 'Jun 2025 – Present',
      description: 'Building robust database solutions and optimizing data pipelines.',
    },
    {
      title: 'Frontend Developer',
      company: 'Matrix Softech Pvt. Ltd.',
      period: 'Sep 2024 – Jun 2025',
      description: 'Developed full-cycle projects using React.js and Next.js. Improved UX and performance.',
    },
    {
      title: 'Software Developer',
      company: 'Vurilo Nepal Pvt. Ltd.',
      period: 'Oct 2022 – Aug 2023',
      description: 'React.js and Django development. Built scalable APIs and improved frontend UX.',
    },
    {
      title: 'Data Specialist',
      company: 'Cloudfactory',
      period: 'Sep 2021 – Sep 2022',
      description: 'Large dataset processing, validation, and filtering.',
    },
  ]

  return (
    <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 scroll-animate">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Experience
          </span>
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-full"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className={`scroll-animate flex gap-8 ${
                  idx % 2 === 0 ? 'flex-col sm:flex-row-reverse' : 'flex-col sm:flex-row'
                }`}
              >
                {/* Timeline dot */}
                <div className="flex-shrink-0 flex items-center justify-center">
                  <div className="relative w-8 h-8">
                    <div className="absolute inset-0 bg-primary rounded-full glow"></div>
                    <div className="absolute inset-2 bg-background rounded-full"></div>
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 sm:w-1/2 ${idx % 2 === 0 ? 'sm:text-right' : ''}`}>
                  <div className="glass p-6 rounded-xl border border-primary/20 hover:border-primary/50 transition-all duration-300">
                    <h3 className="text-xl font-bold text-primary mb-2">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{exp.company}</p>
                    <p className="text-xs text-muted-foreground/70 mb-3">{exp.period}</p>
                    <p className="text-sm text-foreground/80">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

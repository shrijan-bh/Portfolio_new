'use client'

export default function Education() {
  const education = [
    {
      institution: 'Kathford Int\'l College of Engineering',
      degree: 'B.E. Computer Engineering',
      icon: '🎓',
    },
    {
      institution: 'Capital College and Research Center',
      degree: 'Intermediate Level',
      icon: '📖',
    },
    {
      institution: 'Shree Pokhariya Secondary School',
      degree: 'SLC',
      icon: '🏫',
    },
  ]

  return (
    <section id="education" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 scroll-animate">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Education
          </span>
        </h2>

        <div className="space-y-6">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="scroll-animate glass p-6 rounded-xl border border-primary/20 hover:border-primary/50 transition-all duration-300 flex items-start gap-4"
            >
              <div className="text-3xl flex-shrink-0">{edu.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground">{edu.institution}</h3>
                <p className="text-sm text-primary font-semibold mt-1">{edu.degree}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Certificates */}
        <div className="mt-12 scroll-animate">
          <h3 className="text-2xl font-bold text-primary mb-6">Certifications</h3>
          <div className="glass p-6 rounded-xl border border-primary/20 flex items-center gap-4">
            <div className="text-4xl">🏆</div>
            <div>
              <p className="font-semibold text-foreground">Entry Level Python Developer</p>
              <p className="text-sm text-muted-foreground">Professional Certification</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

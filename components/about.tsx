'use client'

export default function About() {
  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 scroll-animate">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Me
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="scroll-animate">
            <p className="text-lg text-muted-foreground/90 leading-relaxed mb-6">
              A versatile and dynamic developer skilled in programming, data processing, and full-stack development. Experienced in backend, frontend, ETL pipelines, and scalable solutions. Passionate about performance, UX, and modern engineering.
            </p>
            <p className="text-lg text-muted-foreground/90 leading-relaxed">
              I combine technical expertise with creative problem-solving to build solutions that are not only functional but also beautiful and user-centric. My journey spans from freelance work to enterprise development, always focused on learning and growing.
            </p>
          </div>

          {/* Icons grid */}
          <div className="grid grid-cols-2 gap-6 scroll-animate">
            {[
              { title: 'Backend', icon: '⚙️' },
              { title: 'Frontend', icon: '🎨' },
              { title: 'Data', icon: '📊' },
              { title: 'DevOps', icon: '🚀' },
            ].map((item) => (
              <div
                key={item.title}
                className="glass p-6 rounded-xl border border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 cursor-pointer group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <p className="font-semibold text-foreground">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

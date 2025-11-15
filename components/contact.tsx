'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    const mailtoLink = `mailto:Shrijan.bh@gmail.com?subject=Message from ${formData.name}&body=${formData.message}%0A%0AFrom: ${formData.email}`
    window.location.href = mailtoLink
  }

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 scroll-animate text-center">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Get In Touch
          </span>
        </h2>

        {/* Contact Info - Now displayed at top of form */}
        <div className="space-y-4 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass p-4 rounded-xl border border-primary/20 hover:border-primary/50 transition-all text-center">
            <div className="text-3xl mb-2">📧</div>
            <p className="text-sm text-muted-foreground">Email</p>
            <a href="mailto:Shrijan.bh@gmail.com" className="text-primary font-semibold hover:underline text-sm">
              Shrijan.bh@gmail.com
            </a>
          </div>

          <div className="glass p-4 rounded-xl border border-primary/20 hover:border-primary/50 transition-all text-center">
            <div className="text-3xl mb-2">📱</div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <a href="tel:+9867576383" className="text-primary font-semibold hover:underline text-sm">
              +977 9867576383
            </a>
          </div>

          <div className="glass p-4 rounded-xl border border-primary/20 hover:border-primary/50 transition-all text-center">
            <div className="text-3xl mb-2">🔗</div>
            <p className="text-sm text-muted-foreground">Social</p>
            <a href="https://github.com/shrijan-bh" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline text-sm">
              GitHub Profile
            </a>
          </div>
        </div>

        {/* Contact Form - Now full width */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none"
            required
          />
          <button
            type="submit"
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
          >
            Send Message
          </button>
        </form>

        {/* Footer */}
        <div className="mt-20 pt-12 border-t border-border text-center scroll-animate">
          <p className="text-muted-foreground">
            © 2025 Shrijan Bhandari. Designed & Developed with passion.
          </p>
        </div>
      </div>
    </section>
  )
}

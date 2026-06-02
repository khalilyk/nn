"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", venue: "", message: "", budget: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="px-6 md:px-12 pt-32 pb-24">
      <div className="max-w-5xl">
        <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">Contact</p>
        <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-bold leading-none tracking-tight mb-16">
          Let&apos;s make<br />something.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <p className="text-white/60 leading-relaxed text-lg mb-12">
              Tell us about your venue. We work with restaurants, cafes, and bars in Sydney, Dubai, and Beirut — and beyond.
            </p>
            <div className="space-y-8">
              <div>
                <p className="text-xs tracking-widest uppercase text-white/30 mb-2">Email</p>
                <a href="mailto:hello@thisisnn.com" className="text-white/70 hover:text-white transition-colors">
                  hello@thisisnn.com
                </a>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-white/30 mb-2">Phone</p>
                <a href="tel:+61433714701" className="text-white/70 hover:text-white transition-colors">
                  +61 433 714 701
                </a>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-white/30 mb-2">Based In</p>
                <p className="text-white/70">Sydney · Dubai · Beirut</p>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-white/30 mb-2">Instagram</p>
                <a
                  href="https://instagram.com/bynotnormal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  @bynotnormal
                </a>
              </div>
              <div className="pt-4">
                <a
                  href="https://calendly.com/notnormal/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs tracking-widest uppercase bg-white text-[#0a0a0a] px-6 py-3 hover:bg-white/80 transition-colors"
                >
                  Book a Free 30-Min Call
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-start justify-center h-full">
                <h2 className="text-3xl font-bold mb-4">Message received.</h2>
                <p className="text-white/50">We&apos;ll be in touch within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-xs tracking-widest uppercase text-white/30 block mb-2">Name *</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder-white/20 focus:outline-none focus:border-white/60 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-white/30 block mb-2">Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder-white/20 focus:outline-none focus:border-white/60 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-white/30 block mb-2">Venue / Business</label>
                  <input
                    type="text"
                    value={form.venue}
                    onChange={(e) => setForm({ ...form, venue: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder-white/20 focus:outline-none focus:border-white/60 transition-colors"
                    placeholder="Your restaurant or cafe"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-white/30 block mb-2">Budget Range</label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="w-full bg-[#0a0a0a] border-b border-white/20 pb-3 text-white focus:outline-none focus:border-white/60 transition-colors"
                  >
                    <option value="">Select range</option>
                    <option value="under-5k">Under $5k</option>
                    <option value="5k-15k">$5k – $15k</option>
                    <option value="15k-30k">$15k – $30k</option>
                    <option value="30k+">$30k+</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-white/30 block mb-2">Tell Us About Your Project *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder-white/20 focus:outline-none focus:border-white/60 transition-colors resize-none"
                    placeholder="What are you working on? Opening a new venue, refreshing an existing brand, need social content..."
                  />
                </div>
                <button
                  type="submit"
                  className="text-xs tracking-widest uppercase bg-white text-[#0a0a0a] px-8 py-4 hover:bg-white/80 transition-colors w-full md:w-auto"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

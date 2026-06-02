"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", budget: "" });
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
              Tell us about your project. We&apos;re selective about who we work with — we partner with brands that are serious about being different.
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-xs tracking-widest uppercase text-white/30 mb-1">Email</p>
                <a href="mailto:hello@notnormal.studio" className="text-white/70 hover:text-white transition-colors">
                  hello@notnormal.studio
                </a>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-white/30 mb-1">Based</p>
                <p className="text-white/70">Sydney, AU — Working Worldwide</p>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-white/30 mb-1">New Projects</p>
                <p className="text-white/70">Currently Available Q3 2025</p>
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
                  <label className="text-xs tracking-widest uppercase text-white/30 block mb-2">Company</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder-white/20 focus:outline-none focus:border-white/60 transition-colors"
                    placeholder="Your company"
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
                    <option value="5k-15k">$5k – $15k</option>
                    <option value="15k-50k">$15k – $50k</option>
                    <option value="50k-100k">$50k – $100k</option>
                    <option value="100k+">$100k+</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-white/30 block mb-2">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder-white/20 focus:outline-none focus:border-white/60 transition-colors resize-none"
                    placeholder="Tell us about your project..."
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

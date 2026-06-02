"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const types = ["Restaurant", "Cafe", "Hotel", "Product", "Something Weird"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", what: "", type: "" });
  const [submitted, setSubmitted] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 md:px-10">
      <div>
        <p className="text-[10px] tracking-widest uppercase text-[#E8E2D4]/30 mb-6">Get In Touch</p>
        <div className="overflow-hidden mb-16">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="font-display text-[#E8E2D4] leading-none"
            style={{ fontSize: "clamp(4rem,12vw,10rem)" }}
          >
            LET&apos;S BUILD.
          </motion.h1>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg"
          >
            <p className="font-display text-5xl text-[#D4FF38] mb-4">MESSAGE RECEIVED.</p>
            <p className="text-[#E8E2D4]/50 leading-relaxed">We&apos;ll be in touch within 48 hours. Good things are coming.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-10">
              {[
                { k: "name", label: "Name", placeholder: "Your name", required: true },
                { k: "company", label: "Company / Venue", placeholder: "Your restaurant or brand", required: false },
                { k: "email", label: "Email", placeholder: "your@email.com", required: true },
                { k: "phone", label: "Phone", placeholder: "+61 or +971", required: false },
              ].map((f) => (
                <div key={f.k}>
                  <label className="text-[9px] tracking-widest uppercase text-[#E8E2D4]/30 block mb-3">{f.label}{f.required ? " *" : ""}</label>
                  <input
                    required={f.required}
                    type={f.k === "email" ? "email" : "text"}
                    value={form[f.k as keyof typeof form]}
                    onChange={set(f.k)}
                    placeholder={f.placeholder}
                    className="w-full border-b border-[#E8E2D4]/15 pb-3 text-[#E8E2D4] placeholder-[#E8E2D4]/20 focus:border-[#D4FF38] transition-colors text-sm"
                  />
                </div>
              ))}

              {/* Type selection */}
              <div>
                <label className="text-[9px] tracking-widest uppercase text-[#E8E2D4]/30 block mb-4">What Are You Building?</label>
                <div className="flex flex-wrap gap-2">
                  {types.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, type: t }))}
                      className={`text-[9px] tracking-widest uppercase px-4 py-2 border transition-colors ${
                        form.type === t
                          ? "border-[#D4FF38] text-[#D4FF38] bg-[#D4FF38]/5"
                          : "border-[#E8E2D4]/15 text-[#E8E2D4]/30 hover:border-[#E8E2D4]/40 hover:text-[#E8E2D4]/60"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[9px] tracking-widest uppercase text-[#E8E2D4]/30 block mb-3">Tell Us More *</label>
                <textarea
                  required
                  rows={4}
                  value={form.what}
                  onChange={set("what")}
                  placeholder="What are you building? What's the challenge? When do you need to be ready?"
                  className="w-full border-b border-[#E8E2D4]/15 pb-3 text-[#E8E2D4] placeholder-[#E8E2D4]/20 focus:border-[#D4FF38] transition-colors resize-none text-sm"
                />
              </div>

              <button
                type="submit"
                className="group flex items-center gap-4 border border-[#D4FF38] px-8 py-4 hover:bg-[#D4FF38] transition-colors"
              >
                <span className="text-[10px] tracking-widest uppercase text-[#D4FF38] group-hover:text-[#080808] transition-colors">
                  Send Message
                </span>
                <span className="text-[#D4FF38] group-hover:text-[#080808] transition-colors">→</span>
              </button>
            </form>

            {/* Info */}
            <div className="flex flex-col justify-between">
              <div className="space-y-10">
                {[
                  { label: "Email", val: "hello@thisisnn.com", href: "mailto:hello@thisisnn.com" },
                  { label: "Phone", val: "+61 433 714 701", href: "tel:+61433714701" },
                  { label: "Instagram", val: "@bynotnormal", href: "https://instagram.com/bynotnormal" },
                  { label: "Book a Call", val: "calendly.com/notnormal/30min", href: "https://calendly.com/notnormal/30min" },
                ].map((c) => (
                  <div key={c.label}>
                    <p className="text-[9px] tracking-widest uppercase text-[#E8E2D4]/25 mb-2">{c.label}</p>
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-[#E8E2D4]/60 hover:text-[#E8E2D4] transition-colors text-sm">
                      {c.val}
                    </a>
                  </div>
                ))}
              </div>
              <p className="text-[10px] tracking-widest uppercase text-[#E8E2D4]/20 mt-10">
                Sydney · Dubai · Beirut
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

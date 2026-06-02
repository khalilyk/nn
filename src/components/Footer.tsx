import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-12 flex items-center justify-between px-5 md:px-6 bg-[#080808] border-t border-[#E8E2D4]/8">
      {/* Logo mark */}
      <div className="flex items-center gap-6">
        <Link href="/" className="w-7 h-7 rounded-full border border-[#D4FF38]/60 flex items-center justify-center">
          <span className="font-display text-[9px] text-[#D4FF38] leading-none">NN</span>
        </Link>
        <div className="hidden md:flex items-center gap-4">
          {["Sydney", "Dubai", "Beirut"].map((c, i) => (
            <span key={c} className="flex items-center gap-4">
              <span className="text-[9px] tracking-[0.15em] uppercase text-[#E8E2D4]/40 hover:text-[#E8E2D4] transition-colors cursor-pointer">
                {c}
              </span>
              {i < 2 && <span className="text-[#E8E2D4]/15 text-[8px]">·</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Center socials */}
      <div className="hidden md:flex items-center gap-6">
        {[
          { label: "Instagram", href: "https://instagram.com/bynotnormal" },
          { label: "LinkedIn", href: "https://linkedin.com/company/bynotnormal" },
          { label: "Journal", href: "/thinking" },
        ].map((l, i, arr) => (
          <span key={l.label} className="flex items-center gap-6">
            <Link
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="text-[9px] tracking-[0.18em] uppercase text-[#E8E2D4]/35 hover:text-[#E8E2D4] transition-colors"
            >
              {l.label}
            </Link>
            {i < arr.length - 1 && <span className="text-[#E8E2D4]/15 text-[8px]">·</span>}
          </span>
        ))}
      </div>

      {/* Email */}
      <a
        href="mailto:hello@thisisnn.com"
        className="text-[9px] tracking-[0.15em] uppercase text-[#E8E2D4]/35 hover:text-[#D4FF38] transition-colors"
      >
        hello@thisisnn.com
      </a>
    </footer>
  );
}

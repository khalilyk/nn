import Link from "next/link";
import { getSiteContent } from "@/lib/content/get";
import { SECTIONS } from "@/lib/content/sections";

export const dynamic = "force-dynamic";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default async function AdminDashboard() {
  const content = await getSiteContent();
  const stats = [
    { label: "Projects", value: content.projects.length },
    { label: "Notes", value: content.notes.posts.length },
    { label: "Testimonials", value: content.testimonials.length },
    { label: "Menu items", value: content.menu.courses.reduce((n, c) => n + c.items.length, 0) },
  ];
  return (
    <div className="pb-10">
      <div className="flex flex-wrap items-end justify-between gap-3 pt-1 pb-7">
        <h1 className="text-[#0A0A0A]" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 600, letterSpacing: "-0.02em" }}>
          {greeting()}, <span className="text-[#0A0A0A]/45">Khalil</span>
        </h1>
        <p className="text-[13px] text-[#0A0A0A]/50">Pick a section to edit.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {stats.map((s, i) => (
          <div key={s.label} className={`rounded-2xl p-4 ${i === 1 ? "bg-[#F4C84B]" : "bg-white/70"}`}>
            <div className="text-[28px] font-semibold leading-none text-[#0A0A0A]">{s.value}</div>
            <div className="mt-2 text-[11px] tracking-[0.12em] uppercase text-[#0A0A0A]/55">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {SECTIONS.map((s) => (
          <Link key={s.key} href={`/admin/${s.key}`} className="rounded-2xl bg-white/70 hover:bg-white p-5 transition-colors">
            <div className="text-[15px] font-medium text-[#0A0A0A]">{s.label}</div>
            <div className="text-[12px] text-[#0A0A0A]/45 mt-1">Edit →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

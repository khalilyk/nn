import Link from "next/link";

export const metadata = { title: "Not Normal — Admin" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#D9DBDD] p-3 md:p-5" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div className="mx-auto max-w-6xl rounded-[28px] bg-gradient-to-b from-[#F7F2E7] to-[#F1E6C9] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)] overflow-hidden">
        {/* top bar */}
        <div className="flex items-center justify-between gap-4 px-5 md:px-8 py-4">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/notnormal-iconoutline.png" alt="" className="h-6 w-auto" />
            <span className="font-bold tracking-tight text-[#0A0A0A]">Not Normal</span>
          </div>

          <nav className="hidden sm:flex items-center gap-1 rounded-full bg-white/50 backdrop-blur px-1.5 py-1.5 text-[13px]">
            <Link href="/admin" className="rounded-full bg-[#1C1C1C] text-white px-4 py-1.5">Dashboard</Link>
            <Link href="/admin/submissions" className="rounded-full px-4 py-1.5 text-[#0A0A0A]/70 hover:text-[#0A0A0A]">Submissions</Link>
            <Link href="/" target="_blank" className="rounded-full px-4 py-1.5 text-[#0A0A0A]/70 hover:text-[#0A0A0A]">View site ↗</Link>
          </nav>

          <div className="flex items-center gap-2">
            <form action="/api/admin/logout" method="post">
              <button className="rounded-full bg-white/60 hover:bg-white px-4 py-2 text-[12px] tracking-[0.12em] uppercase text-[#0A0A0A]/70 hover:text-[#0A0A0A] transition-colors">Log out</button>
            </form>
            <span className="grid place-items-center w-9 h-9 rounded-full bg-[#1C1C1C] text-white text-[12px] font-bold">NN</span>
          </div>
        </div>

        <div className="px-5 md:px-8 pb-8">{children}</div>
      </div>
    </div>
  );
}

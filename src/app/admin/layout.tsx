import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = { title: "Not Normal — Admin" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-surface min-h-screen bg-[#D9DBDD] p-3 md:p-5" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div className="mx-auto max-w-6xl rounded-[28px] bg-gradient-to-b from-[#F7F2E7] to-[#F1E6C9] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)] overflow-hidden">
        {/* top bar */}
        <div className="flex items-center justify-between gap-4 px-5 md:px-8 py-4">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/notnormal-iconoutline.png" alt="" className="h-6 w-auto" />
            <span className="font-bold tracking-tight text-[#0A0A0A]">Not Normal</span>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" className="rounded-full bg-white/60 hover:bg-white px-4 py-2 text-[12px] text-[#0A0A0A]/70 hover:text-[#0A0A0A] transition-colors">View site ↗</a>
            <form action="/api/admin/logout" method="post">
              <button className="rounded-full bg-white/60 hover:bg-white px-4 py-2 text-[12px] tracking-[0.12em] uppercase text-[#0A0A0A]/70 hover:text-[#0A0A0A] transition-colors">Log out</button>
            </form>
            <span className="grid place-items-center w-9 h-9 rounded-full bg-[#1C1C1C] text-white text-[12px] font-bold">K</span>
          </div>
        </div>

        {/* body: sidebar + page */}
        <div className="grid grid-cols-1 md:grid-cols-[210px_1fr] gap-5 px-5 md:px-8 pb-8">
          <AdminSidebar />
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}

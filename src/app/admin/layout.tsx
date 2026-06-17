import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = { title: "Not Normal — Admin" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-surface min-h-screen md:h-screen md:overflow-hidden bg-[#E8E8EA] p-3 md:p-5 text-[#0A0A0A]" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div className="mx-auto max-w-6xl md:h-full flex flex-col md:flex-row gap-3 md:gap-5">
        <AdminSidebar />

        <div className="flex-1 min-w-0 md:h-full md:overflow-y-auto">
          {/* toolbar */}
          <div className="flex items-center justify-between gap-3 rounded-[22px] bg-white shadow-sm px-5 py-3 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/notnormal-logoblack.png" alt="Not Normal" className="h-4 w-auto" />
            <div className="flex items-center gap-2">
              <a href="/" target="_blank" className="rounded-full bg-[#F1F1F3] hover:bg-[#E6E6E9] px-4 py-2 text-[12px] text-[#0A0A0A]/70 transition-colors">View site ↗</a>
              <form action="/api/admin/logout" method="post">
                <button className="rounded-full bg-[#0A0A0A] text-white px-4 py-2 text-[12px] tracking-[0.1em] uppercase hover:opacity-80 transition-opacity">Log out</button>
              </form>
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export const metadata = { title: "Not Normal — Admin" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0A0A0A]" style={{ fontFamily: "system-ui, sans-serif" }}>
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur border-b border-black/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-bold tracking-tight">Not Normal · Admin</span>
          <nav className="flex items-center gap-4 text-[13px]">
            <Link href="/admin" className="hover:underline">Content</Link>
            <Link href="/admin/submissions" className="hover:underline">Submissions</Link>
            <Link href="/" target="_blank" className="text-black/50 hover:text-black">View site ↗</Link>
          </nav>
        </div>
        <form action="/api/admin/logout" method="post">
          <button className="text-[12px] tracking-[0.12em] uppercase text-black/50 hover:text-black">Log out</button>
        </form>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}

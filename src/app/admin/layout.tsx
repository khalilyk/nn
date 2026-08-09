import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = { title: "Not Normal — Admin" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-surface min-h-screen md:h-screen md:overflow-hidden bg-[#F1EEE6] p-3 md:p-4 text-[#14151A]" style={{ fontFamily: "var(--font-grotesk), system-ui, -apple-system, sans-serif" }}>
      <div className="mx-auto max-w-[1180px] md:h-full flex flex-col md:flex-row gap-3 md:gap-4">
        <AdminSidebar />

        <div className="flex-1 min-w-0 md:h-full md:overflow-y-auto md:pr-1">
          {children}
        </div>
      </div>
    </div>
  );
}

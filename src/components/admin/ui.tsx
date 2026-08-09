import Link from "next/link";
import type { ReactNode } from "react";

/* ────────────────────────────────────────────────────────────────────────
   Shared admin design system. One set of primitives so every screen shares
   the same spacing, radius, type scale and states. Presentational only —
   safe to use from both server and client components.
   ──────────────────────────────────────────────────────────────────────── */

export const TOKENS = {
  ink: "#0A0A0A",
  canvas: "#E8E8EA",
  accent: "#D7F23A",
  blue: "#2D6BFF",
  green: "#1F9D55",
  red: "#C0392B",
  amber: "#E08A00",
};

/** White rounded surface — the base container for everything. */
export function Card({ children, className = "", pad = true }: { children: ReactNode; className?: string; pad?: boolean }) {
  return <div className={`rounded-3xl bg-white shadow-sm ${pad ? "p-5" : ""} ${className}`}>{children}</div>;
}

/** Page title row with an optional right-side action slot. */
export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 pt-1 pb-6">
      <div>
        <h1 className="text-[#0A0A0A]" style={{ fontSize: "clamp(1.7rem, 3.6vw, 2.4rem)", fontWeight: 600, letterSpacing: "-0.02em" }}>
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-[13px] text-black/45">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

/** Section header inside a card: title + optional link/action on the right. */
export function CardHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-[13px] font-semibold text-[#0A0A0A]">{title}</h2>
      {action}
    </div>
  );
}

/** KPI tile. `accent` fills it with the lime brand colour. */
export function StatTile({
  value, label, hint, accent = false, href,
}: { value: ReactNode; label: string; hint?: ReactNode; accent?: boolean; href?: string }) {
  const inner = (
    <>
      <div className="flex items-baseline gap-2">
        <div className="text-[30px] font-bold leading-none tracking-tight text-[#0A0A0A]">{value}</div>
        {hint}
      </div>
      <div className="mt-3 text-[11px] tracking-[0.12em] uppercase text-[#0A0A0A]/50">{label}</div>
    </>
  );
  const cls = `block rounded-3xl p-5 shadow-sm transition-shadow ${accent ? "bg-[#D7F23A]" : "bg-white"} ${href ? "hover:shadow-md" : ""}`;
  return href ? <Link href={href} className={cls}>{inner}</Link> : <div className={cls}>{inner}</div>;
}

const BADGE: Record<string, string> = {
  neutral: "bg-black/10 text-black/60",
  blue: "bg-[#2D6BFF]/15 text-[#2D6BFF]",
  green: "bg-[#1F9D55]/15 text-[#1F9D55]",
  red: "bg-[#C0392B]/15 text-[#C0392B]",
  amber: "bg-[#E08A00]/15 text-[#B26A00]",
  ink: "bg-[#0A0A0A] text-white",
};

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: keyof typeof BADGE }) {
  return <span className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full whitespace-nowrap ${BADGE[tone]}`}>{children}</span>;
}

/** Button — primary (ink), lime, or ghost. Renders <Link> when `href` is set. */
export function Button({
  children, href, onClick, variant = "primary", size = "md", type, disabled, target, className = "",
}: {
  children: ReactNode; href?: string; onClick?: () => void; variant?: "primary" | "lime" | "ghost" | "danger";
  size?: "sm" | "md"; type?: "button" | "submit"; disabled?: boolean; target?: string; className?: string;
}) {
  const variants = {
    primary: "bg-[#0A0A0A] text-white hover:opacity-80",
    lime: "bg-[#D7F23A] text-[#0A0A0A] hover:brightness-95",
    ghost: "bg-[#F1F1F3] text-[#0A0A0A]/70 hover:bg-[#E6E6E9]",
    danger: "bg-[#C0392B]/10 text-[#C0392B] hover:bg-[#C0392B]/20",
  };
  const sizes = { sm: "px-3.5 py-2 text-[11px]", md: "px-5 py-2.5 text-[12px]" };
  const cls = `inline-flex items-center gap-2 rounded-full tracking-[0.08em] uppercase transition-all disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`;
  if (href) return <Link href={href} target={target} className={cls}>{children}</Link>;
  return <button type={type || "button"} onClick={onClick} disabled={disabled} className={cls}>{children}</button>;
}

/** Circle avatar from a name's initial. */
export function Avatar({ name, size = 32 }: { name?: string; size?: number }) {
  return (
    <span
      className="grid place-items-center rounded-full bg-[#E8E8EA] font-bold text-[#0A0A0A] shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {(name || "?").charAt(0).toUpperCase()}
    </span>
  );
}

/** Empty-state message inside a card. */
export function EmptyState({ children }: { children: ReactNode }) {
  return <p className="text-[12px] text-black/40 py-1">{children}</p>;
}

/** A titled section card with an optional header action and body. */
export function SectionCard({ title, action, children, className = "" }: { title: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <Card className={className}>
      <CardHeader title={title} action={action} />
      {children}
    </Card>
  );
}

/** Small right-aligned "View all →" style link. */
export function CardLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="text-[12px] text-black/45 hover:text-black transition-colors">{children}</Link>;
}

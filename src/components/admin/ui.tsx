import Link from "next/link";
import type { ReactNode } from "react";

/* ────────────────────────────────────────────────────────────────────────
   Shared admin design system. One set of primitives so every screen shares
   the same spacing, radius, type scale and states. Presentational only —
   safe to use from both server and client components.
   ──────────────────────────────────────────────────────────────────────── */

export const TOKENS = {
  ink: "#0A0A0A",
  canvas: "#F3F1EC",
  accent: "#D7F23A",
  blue: "#2D6BFF",
  green: "#1F9D55",
  red: "#C0392B",
  amber: "#E08A00",
};

/** White rounded surface — the base container for everything. */
export function Card({ children, className = "", pad = true }: { children: ReactNode; className?: string; pad?: boolean }) {
  return <div className={`rounded-2xl bg-white border border-[#14151A]/[0.1] ${pad ? "p-5" : ""} ${className}`}>{children}</div>;
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

/** Small red count bubble for things needing attention. */
export function Bubble({ count }: { count?: number }) {
  if (!count || count <= 0) return null;
  return (
    <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#C0392B] px-1.5 text-[10px] font-semibold leading-none text-white ring-2 ring-white">
      {count}
    </span>
  );
}

/** Workspace card (bric style): bordered white tile — uppercase label + arrow,
 *  big count, optional sub-line and a corner alert bubble. Extra legacy props
 *  (icon/tint/accent/hint) are accepted but ignored. */
export function StatTile({
  value, label, href, sub, alert, hint,
}: { value: ReactNode; label: string; href?: string; sub?: string; alert?: number; hint?: ReactNode; accent?: boolean; icon?: string; tint?: "lavender" | "mint" | "none" }) {
  const inner = (
    <>
      {alert ? <span className="absolute -right-1.5 -top-1.5"><Bubble count={alert} /></span> : null}
      <div className="flex items-start justify-between gap-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.07em] leading-tight text-[#14151A]/50">{label}</span>
        <span className="shrink-0 text-[#14151A]/30 transition-all group-hover:translate-x-0.5 group-hover:text-[#14151A]/60">→</span>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <div className="text-[26px] font-bold leading-none tracking-tight text-[#14151A]">{value}</div>
        {hint}
      </div>
      {sub ? <div className="mt-1.5 text-[11px] leading-tight text-[#14151A]/50 truncate">{sub}</div> : null}
    </>
  );
  const cls = "group relative flex flex-col rounded-2xl border border-[#14151A]/[0.12] bg-white p-4 transition-colors hover:border-[#14151A]/30";
  return href ? <Link href={href} className={cls}>{inner}</Link> : <div className={cls}>{inner}</div>;
}

const BADGE: Record<string, string> = {
  neutral: "bg-[#14151A]/[0.07] text-[#14151A]/60",
  blue: "bg-[#E7E8FB] text-[#5B5FC7]",
  green: "bg-[#E2F4EA] text-[#2E9E6A]",
  red: "bg-[#FBE9E7] text-[#C0503E]",
  amber: "bg-[#FBF0DD] text-[#B26A00]",
  ink: "bg-[#14151A] text-white",
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
    primary: "bg-[#14151A] text-white hover:opacity-85",
    lime: "bg-[#C9CCF5] text-[#14151A] hover:brightness-95",
    ghost: "bg-white text-[#14151A]/70 hover:bg-white/70 border border-[#14151A]/10",
    danger: "bg-[#FBE9E7] text-[#C0503E] hover:bg-[#F6D9D5]",
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
      className="grid place-items-center rounded-full bg-[#E7E8FB] font-bold text-[#14151A] shrink-0"
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

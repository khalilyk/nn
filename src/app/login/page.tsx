import { getSiteContent } from "@/lib/content/get";
import LoginForm from "./LoginForm";

// re-render every request so the featured project photo re-rolls each visit
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const { projects } = await getSiteContent();
  // gather every project image, then pick one at random for the brand panel
  const withNames = projects.flatMap((p) =>
    (p.images?.length ? p.images : p.img ? [p.img] : []).map((src) => ({ src, name: p.name }))
  );
  const pick = withNames.length ? withNames[Math.floor(Math.random() * withNames.length)] : null;
  const hero = pick?.src || null;

  return (
    <main className="admin-surface login-surface min-h-screen bg-black text-white flex flex-col md:flex-row" style={{ fontFamily: "var(--font-grotesk), system-ui, -apple-system, sans-serif" }}>
      {/* left brand panel — random project photo */}
      <div className="relative flex-1 min-h-[34vh] md:min-h-screen overflow-hidden bg-black">
        {hero && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/50" />
          </>
        )}
        {/* brand */}
        <div className="absolute top-7 left-7 md:top-9 md:left-9 z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/notnormal-logoblack.png" alt="Not Normal" className="h-4 w-auto" style={{ filter: "invert(1)" }} />
        </div>
        {/* featured project caption */}
        {pick && (
          <div className="absolute bottom-16 left-7 md:bottom-20 md:left-9 z-10">
            <p className="text-[10px] tracking-[0.28em] uppercase text-white/50">Featured work</p>
            <p className="mt-1 text-[19px] md:text-[22px] font-medium text-white">{pick.name}</p>
          </div>
        )}
        {/* copyright */}
        <div className="absolute bottom-7 left-7 md:bottom-9 md:left-9 z-10 text-[11px] text-white/40">
          © Not Normal {new Date().getFullYear()}. All rights reserved.
        </div>
      </div>

      {/* right form panel */}
      <div className="relative w-full md:w-[44%] bg-[#0E0E0E] flex flex-col justify-center px-7 md:px-14 py-16 md:py-0">
        <LoginForm />
      </div>
    </main>
  );
}

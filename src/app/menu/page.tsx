import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "The Menu · Not Normal",
  description: "Small chops, meat, sides, salads, dessert and sauces — the Not Normal table.",
};

const stroke: React.CSSProperties = { fill: "none", stroke: "#0A0A0A", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };

/* little hand-drawn doodles */
const Cutlery = () => (
  <svg viewBox="0 0 70 90" className="w-full h-full" style={stroke}>
    <path d="M14 14c0 10-3 12-3 18s3 6 3 12-1 30-1 30" />
    <path d="M22 14c0 10 3 12 3 18s-3 6-3 12 1 30 1 30" />
    <path d="M18 14v22" />
    <path d="M44 14c-6 2-9 9-9 18s3 12 9 13c0 6-1 29-1 29" />
    <path d="M58 14c-4 0-7 4-7 14s7 12 7 12-1 28-1 30" />
  </svg>
);
const Grapes = () => (
  <svg viewBox="0 0 60 70" className="w-full h-full" style={stroke}>
    <path d="M30 8c4-3 9-3 12-1" />
    <circle cx="24" cy="22" r="6" /><circle cx="36" cy="22" r="6" />
    <circle cx="18" cy="33" r="6" /><circle cx="30" cy="33" r="6" /><circle cx="42" cy="33" r="6" />
    <circle cx="24" cy="44" r="6" /><circle cx="36" cy="44" r="6" />
    <circle cx="30" cy="55" r="6" />
  </svg>
);
const Cheese = () => (
  <svg viewBox="0 0 80 60" className="w-full h-full" style={stroke}>
    <path d="M6 44L66 14l8 6-8 30z" />
    <circle cx="30" cy="34" r="2.5" /><circle cx="46" cy="30" r="2.5" /><circle cx="40" cy="40" r="2" />
  </svg>
);
const Bread = () => (
  <svg viewBox="0 0 90 40" className="w-full h-full" style={stroke}>
    <path d="M6 32c0-16 18-22 39-22s39 6 39 22z" />
    <path d="M30 16l-5 10M46 14l-5 12M62 16l-5 10" />
  </svg>
);

const head = "font-marker leading-none text-[#0A0A0A]";
const list = "font-editorial mt-4 space-y-1 text-[#0A0A0A]/85";
const listSize = { fontSize: "clamp(0.85rem, 1.3vw, 0.95rem)" };

export default function MenuPage() {
  return (
    <main className="relative bg-[#E7E4DD] text-[#0A0A0A] overflow-hidden">
      <Cursor />
      <SiteNav />

      {/* HEADER */}
      <header className="px-6 pt-36 md:pt-44 pb-10 md:pb-14 text-center">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#0A0A0A]/45 mb-5">Pull up a chair</p>
        <h1 className="font-display uppercase leading-[0.9] tracking-tight" style={{ fontSize: "clamp(2.8rem, 12vw, 8rem)" }}>
          The Menu
        </h1>
        <p className="font-editorial italic mt-5 mx-auto max-w-xl leading-relaxed text-[#0A0A0A]/65" style={{ fontSize: "clamp(1rem, 1.8vw, 1.3rem)" }}>
          Everything we bring to the table, served across Sydney, Dubai &amp; Beirut.
        </p>
      </header>

      {/* THE PAPER */}
      <section className="px-4 md:px-8 pb-20 md:pb-28 flex justify-center">
        <div
          className="relative w-full max-w-[820px] bg-[#EDE7D7] text-[#0A0A0A] px-7 sm:px-12 md:px-16 py-14 md:py-20"
          style={{ transform: "rotate(-0.6deg)", boxShadow: "0 30px 70px -30px rgba(0,0,0,0.4), 0 10px 24px -12px rgba(0,0,0,0.25)" }}
        >
          <Grain />

          {/* doodles */}
          <div className="pointer-events-none absolute right-[14%] top-[8%] w-12 md:w-16 opacity-90 -rotate-6"><Cutlery /></div>
          <div className="pointer-events-none absolute left-[44%] top-[24%] w-12 md:w-16 opacity-90 rotate-6"><Grapes /></div>
          <div className="pointer-events-none absolute left-[42%] top-[50%] w-16 md:w-20 opacity-90 -rotate-3"><Cheese /></div>
          <div className="pointer-events-none absolute right-[34%] top-[62%] w-16 md:w-24 opacity-90 rotate-2"><Bread /></div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 md:gap-y-24">
            {/* LEFT COLUMN */}
            <div className="space-y-14 md:space-y-24">
              <div>
                <h2 className={head} style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", transform: "rotate(-1deg)" }}>Small Chops</h2>
                <ul className={list} style={listSize}>
                  <li>Mini meat pie</li>
                  <li>Tasty&apos;s signature Puff puff</li>
                  <li>Springrolls</li>
                </ul>
              </div>

              <div className="md:pl-8">
                <h2 className={head} style={{ fontSize: "clamp(2rem, 6vw, 3.4rem)", transform: "rotate(-2deg)" }}>Meat</h2>
                <ul className={list} style={listSize}>
                  <li>AFK Chicken</li>
                  <li>Pork Belly &amp; Porchetta</li>
                  <li>Jacobs ladder (beef short ribs)</li>
                  <li>Lamb el asador</li>
                  <li>Cedar-Planked Trout</li>
                </ul>
              </div>

              <div>
                <h2 className={head} style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", transform: "rotate(-1deg)" }}>Salads</h2>
                <div className="font-editorial mt-4 space-y-2 text-[#0A0A0A]/85" style={listSize}>
                  <p><span className="font-semibold">Charred Flatbreads &amp; Sourdough</span><br />with Butters</p>
                  <p><span className="font-semibold">Kale &amp; Tahini Caesar Salad</span><br />with Za&apos;atar, Chickpeas &amp; Roasted Grapes</p>
                  <p><span className="font-semibold">Roasted New Potatoes</span> with Sea Salt &amp; Rosemary</p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-14 md:space-y-28 md:mt-24 md:text-right">
              <div>
                <h2 className={head} style={{ fontSize: "clamp(2rem, 6vw, 3.2rem)", transform: "rotate(2deg)" }}>Sides</h2>
                <ul className={list} style={listSize}>
                  <li>Jollof</li>
                  <li>Fried Rice</li>
                  <li>Fried Plantain</li>
                  <li>Gizzdodo</li>
                  <li>Nigerian Salad</li>
                  <li>Beef Suya</li>
                </ul>
              </div>

              <div className="md:mt-40">
                <h2 className={head} style={{ fontSize: "clamp(1.7rem, 4.5vw, 2.6rem)", transform: "rotate(-2deg)" }}>Dessert</h2>
                <ul className={list} style={listSize}>
                  <li>Ice Cream &amp; Sorbet</li>
                  <li>Fruit Platters</li>
                  <li>Brownies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* SAUCES — bottom */}
          <div className="relative mt-16 md:mt-10">
            <h2 className={head} style={{ fontSize: "clamp(1.7rem, 4.5vw, 2.6rem)", transform: "rotate(-1deg)" }}>Sauces</h2>
            <p className="font-editorial mt-3 text-[#0A0A0A]/85" style={listSize}>
              Chimichurri, Mango Salsa, Hot Sauce, Lemon &amp; Sumac Yogurt, Garlic Mayo
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

import Cursor from "@/components/Cursor";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "The Menu · Not Normal",
  description: "Branding, web, print and PR — everything Not Normal brings to the table.",
};

/* Course content — kept for rebuilding the body. */
export const COURSES = [
  {
    cat: "The Amuse-Bouché", title: "Branding & Identity",
    items: [
      "Naming & Tagline Development",
      "Brand Strategy & Positioning",
      "Logo & Identity Design",
      "Visual Identity Systems",
      "Tone of Voice & Messaging",
      "Brand Guidelines",
      "Menu Design",
      "Packaging Concepts",
    ],
  },
  {
    cat: "The Appetisers", title: "Web Design & Development",
    items: [
      "Website Design",
      "Website Development",
      "UX & User Journey Mapping",
      "Mobile Optimisation",
      "Booking & Reservation Integrations",
      "E-Commerce Solutions",
      "SEO Foundations",
      "Website Management & Updates",
    ],
  },
  {
    cat: "The Mains", title: "Print & Production",
    items: [
      "Signage & Environmental Graphics",
      "Packaging Production",
      "Menus & Printed Collateral",
      "Uniform Design & Manufacture",
      "Promotional Merchandise",
      "Exhibition & Event Displays",
      "Large Format Printing",
    ],
  },
  {
    cat: "The Desserts", title: "PR & Brand Visibility",
    items: [
      "Public Relations (PR)",
      "Media Outreach & Press Releases",
      "Launch Strategies & Campaigns",
      "Influencer & Ambassador Partnerships",
      "Social Media Strategy",
      "Content Creation",
      "Photography & Videography",
      "Community Management",
    ],
  },
];

export default function MenuPage() {
  return (
    <main className="relative bg-[#E7E4DD] text-[#0A0A0A] overflow-hidden">
      <Cursor />
      <SiteNav />

      {/* HEADER */}
      <header className="relative overflow-hidden bg-white px-6 pt-36 md:pt-44 pb-10 md:pb-14 text-center">
        <div aria-hidden className="absolute inset-x-0 top-[30%] z-0 flex justify-center pointer-events-none select-none">
          <span className="font-display uppercase leading-none whitespace-nowrap text-[#0A0A0A]/[0.04]" style={{ fontSize: "clamp(5rem, 22vw, 22rem)" }}>
            Not Normal
          </span>
        </div>
        <div className="relative z-10">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#0A0A0A]/45 mb-5">What we do</p>
          <h1 className="font-display uppercase leading-[0.9] tracking-tight mx-auto max-w-[14ch]" style={{ fontSize: "clamp(2.4rem, 9vw, 6.5rem)" }}>
            It&apos;s how you make them feel
          </h1>
          <p className="font-editorial italic mt-6 mx-auto max-w-xl leading-relaxed text-[#0A0A0A]/65" style={{ fontSize: "clamp(1rem, 1.8vw, 1.3rem)" }}>
            Everything we bring to the table, served across Sydney, Dubai &amp; Beirut.
          </p>
        </div>
      </header>

      {/* BODY — to be rebuilt */}

      <SiteFooter />
    </main>
  );
}

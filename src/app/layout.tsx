import type { Metadata, Viewport } from "next";
import { Playfair_Display, Space_Grotesk, Anton, Caveat, Special_Elite, Permanent_Marker, Rock_Salt, Zilla_Slab, Reenie_Beanie, Space_Mono, DM_Serif_Display, Mansalva, Kalam, Old_Standard_TT, Yellowtail, Imperial_Script } from "next/font/google";
import "./globals.css";
import { getSiteContent } from "@/lib/content/get";
import { SITE_URL } from "@/lib/site-url";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const GA_ID = "G-7G43R5DGEF";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-marker",
  weight: ["500", "700"],
});

const typewriter = Special_Elite({
  subsets: ["latin"],
  variable: "--font-typewriter",
  weight: ["400"],
});

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  variable: "--font-permanent",
  weight: ["400"],
});

const rockSalt = Rock_Salt({
  subsets: ["latin"],
  variable: "--font-rocksalt",
  weight: ["400"],
});

const zillaSlab = Zilla_Slab({
  subsets: ["latin"],
  variable: "--font-slab",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const reenie = Reenie_Beanie({
  subsets: ["latin"],
  variable: "--font-scrawl",
  weight: ["400"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-spacemono",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dmserif",
  weight: ["400"],
  style: ["normal", "italic"],
});

const mansalva = Mansalva({
  subsets: ["latin"],
  variable: "--font-brush",
  weight: ["400"],
});

const kalam = Kalam({
  subsets: ["latin"],
  variable: "--font-kalam",
  weight: ["300", "400", "700"],
});

const oldStandard = Old_Standard_TT({
  subsets: ["latin"],
  variable: "--font-classic",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const yellowtail = Yellowtail({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400"],
});

const imperialScript = Imperial_Script({
  subsets: ["latin"],
  variable: "--font-fancy",
  weight: ["400"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: ["400"],
});

// Applies to every page: pin the layout to the device viewport and disable
// pinch/scale so a page can never drift outside its frame or shrink on zoom.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0A0A0A",
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSiteContent();
  const base = SITE_URL;
  const ogImage = seo.ogImage || "/nn-header-poster.jpg";
  return {
    metadataBase: new URL(base),
    title: { default: seo.title, template: "%s · Not Normal" },
    description: seo.description,
    applicationName: "Not Normal",
    authors: [{ name: "Not Normal" }],
    creator: "Not Normal",
    publisher: "Not Normal",
    category: "Branding & Marketing",
    keywords: seo.keywords ? seo.keywords.split(",").map((k) => k.trim()).filter(Boolean) : undefined,
    alternates: { canonical: "/" },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: "/",
      siteName: "Not Normal",
      type: "website",
      locale: "en_AU",
      images: [{ url: ogImage, width: 1920, height: 1080, alt: "Not Normal, hospitality branding studio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [{ url: ogImage, alt: "Not Normal, hospitality branding studio" }],
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { seo, contact, footer, about } = await getSiteContent();
  const base = SITE_URL;
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${base}/#studio`,
        name: "Not Normal",
        alternateName: "NN",
        url: base,
        logo: `${base}/notnormal-logowhite.png`,
        image: `${base}${seo.ogImage || "/nn-header-poster.jpg"}`,
        description: seo.description,
        slogan: "Nobody Remembers Normal.",
        email: contact.email,
        telephone: contact.phone,
        founder: { "@type": "Person", name: about.founderName },
        areaServed: ["Sydney", "Dubai", "Beirut"],
        knowsAbout: ["Hospitality branding", "Restaurant branding", "Brand strategy", "Marketing", "Web design"],
        address: { "@type": "PostalAddress", addressLocality: "Sydney", addressRegion: "NSW", addressCountry: "AU" },
        sameAs: (footer.socials || []).map((s) => s.href),
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: "Not Normal",
        description: seo.description,
        publisher: { "@id": `${base}/#studio` },
        inLanguage: "en",
      },
    ],
  };
  return (
    <html lang="en" className={`${playfair.variable} ${grotesk.variable} ${anton.variable} ${caveat.variable} ${typewriter.variable} ${permanentMarker.variable} ${rockSalt.variable} ${zillaSlab.variable} ${reenie.variable} ${spaceMono.variable} ${dmSerif.variable} ${mansalva.variable} ${kalam.variable} ${oldStandard.variable} ${yellowtail.variable} ${imperialScript.variable}`}>
      <body className="bg-[#0A0A0A] text-[#F3F1EC]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        {children}
        <Analytics />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}

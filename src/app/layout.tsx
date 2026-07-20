import type { Metadata } from "next";
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
  weight: ["300", "400", "500"],
});

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: ["400"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSiteContent();
  const base = SITE_URL;
  return {
    metadataBase: new URL(base),
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords ? seo.keywords.split(",").map((k) => k.trim()).filter(Boolean) : undefined,
    alternates: { canonical: "/" },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: "/",
      siteName: "Not Normal",
      type: "website",
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${grotesk.variable} ${anton.variable} ${caveat.variable} ${typewriter.variable} ${permanentMarker.variable} ${rockSalt.variable} ${zillaSlab.variable} ${reenie.variable} ${spaceMono.variable} ${dmSerif.variable} ${mansalva.variable} ${kalam.variable} ${oldStandard.variable} ${yellowtail.variable} ${imperialScript.variable}`}>
      <body className="bg-[#0A0A0A] text-[#F3F1EC]">
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

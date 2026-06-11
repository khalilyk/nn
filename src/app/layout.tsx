import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk, Anton, Caveat, Special_Elite, Permanent_Marker, Zilla_Slab, Reenie_Beanie, Space_Mono, DM_Serif_Display, Mansalva, Kalam, Old_Standard_TT, Yellowtail, Imperial_Script } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Not Normal, Nobody Remembers Normal",
  description:
    "A hospitality branding and marketing studio for brands that refuse to blend in. Sydney, Dubai, Beirut.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${grotesk.variable} ${anton.variable} ${caveat.variable} ${typewriter.variable} ${permanentMarker.variable} ${zillaSlab.variable} ${reenie.variable} ${spaceMono.variable} ${dmSerif.variable} ${mansalva.variable} ${kalam.variable} ${oldStandard.variable} ${yellowtail.variable} ${imperialScript.variable}`}>
      <body className="bg-[#0A0A0A] text-[#F3F1EC]">{children}</body>
    </html>
  );
}

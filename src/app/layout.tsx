import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk, Anton, Caveat } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-marker",
  weight: ["500", "700"],
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
    <html lang="en" className={`${playfair.variable} ${grotesk.variable} ${anton.variable} ${caveat.variable}`}>
      <body className="bg-[#0A0A0A] text-[#F3F1EC]">{children}</body>
    </html>
  );
}

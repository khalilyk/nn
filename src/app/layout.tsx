import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Not Normal — The Collection",
  description: "Where the past becomes the future.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${grotesk.variable}`}>
      <body className="bg-[#060409] text-[#F2ECD8] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

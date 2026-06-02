import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";
import Cursor from "@/components/Cursor";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const dm = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Not Normal — Hospitality Brand Advisory",
  description: "Nobody Remembers Normal. A hospitality brand advisory for those that refuse to blend in. Sydney · Dubai · Beirut.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${dm.variable}`}>
      <body className="bg-[#080808] text-[#E8E2D4]">
        <LenisProvider>
          <Cursor />
          <Header />
          <main className="pt-12 pb-12">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}

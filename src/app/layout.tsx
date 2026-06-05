import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Not Normal",
  description: "Not Normal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

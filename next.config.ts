import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // keep the headless-chromium packages out of the bundle (loaded at runtime in the PDF route)
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
  // the chromium binary (bin/*.br) is read from disk at runtime, so file-tracing must include it
  outputFileTracingIncludes: {
    "/api/admin/proposals/**": ["./node_modules/@sparticuz/chromium/bin/**"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  // /contact was folded into /main — send it straight to the contact section
  async redirects() {
    return [
      { source: "/contact", destination: "/main#contact-form", permanent: true },
    ];
  },
};

export default nextConfig;

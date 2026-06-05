"use client";

import dynamic from "next/dynamic";

const Publication = dynamic(() => import("@/components/Publication"), { ssr: false });

export default function Home() {
  return <Publication />;
}

"use client";

import dynamic from "next/dynamic";

export const ThreeHeroIsland = dynamic(
  () => import("@/components/ThreeHero").then((mod) => mod.ThreeHero),
  {
    ssr: false
  }
);

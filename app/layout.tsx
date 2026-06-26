import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AetherFlow — Autonomous AI Data Automation",
  description:
    "AetherFlow watches every warehouse, stream, sheet, and webhook, then builds resilient automation paths before your team has to ask.",
  robots: "index, follow",
  keywords: ["AI automation", "SaaS", "data workflows", "AetherFlow"],
  openGraph: {
    title: "AetherFlow — Autonomous AI Data Automation",
    description: "Turn scattered data into living workflows.",
    type: "website",
    siteName: "AetherFlow",
    images: ["/og-image.png"],
    url: "https://your-deployment-url.vercel.app"
  },
  twitter: {
    card: "summary_large_image",
    title: "AetherFlow",
    description: "Turn scattered data into living workflows."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

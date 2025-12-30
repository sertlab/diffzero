import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
// import AdBanner from "@/components/AdBanner"; // TODO: Enable after AdSense approval
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "DiffZero | Secure Client-Side Diff Checker - No Data Uploads",
  description: "Compare code, JSON, and text 100% offline. Privacy-first diff tool that never uploads your data. Perfect for developers with sensitive files. Try it free.",
  keywords: ["secure diff checker", "compare text online", "json difference tool", "offline code compare", "client-side diff", "privacy diff tool"],
  openGraph: {
    title: "DiffZero - Secure Client-Side Diff Checker",
    description: "Compare code without uploading it anywhere. Privacy-first diff tool for developers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#09090b] text-white`}
      >
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* TODO: Enable AdBanner after AdSense approval */}
          {/* <AdBanner position="top" /> */}
          {children}
          {/* <AdBanner position="bottom" /> */}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

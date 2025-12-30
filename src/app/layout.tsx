import type { Metadata } from "next";
import { Imbue, Poppins } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
const geistSans = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-text",
});
const title = Imbue({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["900"],
});

export const metadata: Metadata = {
  title: "Ibtihel Ben Salah | Artiste Peintre Tunisienne Portfolio",
  description:
    "Artiste peintre tunisienne. Découvrez mes aquarelles, acryliques et gouaches célébrant la culture, la gastronomie et l'architecture de Tunisie.",
  alternates: {
    canonical: "https://nextjs-art-ibtihelbensalah.vercel.app",
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
        className={`${geistSans.variable} ${title.variable}  antialiased p-2  md:px-16`}
      >
        <Nav />
        {children}
        <Footer />
        <GoogleAnalytics gaId="G-784201359" />
        <GoogleTagManager gtmId="GTM-N58ZPTP8" />
      </body>
    </html>
  );
}

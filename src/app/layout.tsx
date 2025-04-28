import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Imbue } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const title = Imbue({
  variable: "--font-title",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ibtihel ben salah art portfolio",
  description:
    "Ibtihel Ben Salah — Visual artist capturing vibrant scenes through watercolor, acrylic, and gouache. Explore unique pieces celebrating Tunisian culture, food, architecture, and more",
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
      </body>
    </html>
  );
}

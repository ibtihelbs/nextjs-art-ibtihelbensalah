import type { Metadata } from "next";
import { Imbue, Poppins } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
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

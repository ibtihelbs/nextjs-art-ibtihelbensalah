"use client";

import Image from "next/image";
import Link from "next/link";
import { XlTitle } from "@/app/components/Text";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const socialLinks = [
  {
    src: "/png/008-tiktok.png",
    href: "https://www.tiktok.com/@ibtiheldoestuff",
  },
  {
    src: "/png/002-instagram.png",
    href: "https://www.instagram.com/stuffed.peanuts",
  },
  {
    src: "/png/002-instagram.png",
    href: "https://www.instagram.com/paintings.by.ibs",
  },
  {
    src: "/png/007-pinterest-1.png",
    href: "https://www.pinterest.com/artbyibs",
  },
];

const Nav = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setIsVisible(false);
    } else if (latest < previous || latest < 10) {
      setIsVisible(true);
    }
  });

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? "0%" : "-100%" }}
      transition={{ type: "spring", damping: 20, duration: 1 }}
      className="sticky top-0 z-50 bg-white "
    >
      <div className="upper-nav flex gap-4 justify-between items-center bg-red">
        <p className="text-sm text-slate-800 font-medium underline text-nowrap">
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <hr className="w-full border-2 rounded-full" />
        <div className="flex gap-1">
          {socialLinks.map((link, i) => (
            <a
              href={link.href}
              key={i}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Social media link ${i}`}
            >
              <Image src={link.src} alt="social icon" width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
      <div className="middle-nav grid place-content-center">
        <XlTitle content={"IBTIHEL BEN SALAH"} className={"lg:text-9xl"} />
      </div>
      <hr />

      <nav className="flex justify-between uppercase font-bold">
        <ul className="flex gap-2">
          <li>
            <Link href={"/"}>home</Link>
          </li>
          <li>
            <Link href={"/blog"}>Blog</Link>
          </li>
        </ul>
        <Link href={"/portfolio"}>Portfolio</Link>
        <ul className="flex gap-2">
          <li>
            <Link href={"/shop"}>shop</Link>
          </li>
          <li>
            <Link href={"/#contact"}>contact</Link>
          </li>
        </ul>
      </nav>
      <hr />
    </motion.header>
  );
};

export default Nav;

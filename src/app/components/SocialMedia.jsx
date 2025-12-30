"use client";
import Image from "next/image";

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
const SocialMedia = ({ w, h }) => {
  return (
    <div className="flex gap-1 m-auto">
      {socialLinks.map((link, i) => (
        <a
          href={link.href}
          key={i}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Social media link ${i}`}
        >
          <Image
            src={link.src}
            alt="social icon"
            width={w || 20}
            height={h || 20}
          />
        </a>
      ))}
    </div>
  );
};

export default SocialMedia;

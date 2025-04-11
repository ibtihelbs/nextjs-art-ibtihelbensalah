import Image from "next/image";
import Link from "next/link";
import { XlTitle } from "@/app/components/Text";
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
  return (
    <header>
      <hr />
      <div className="upper-nav flex gap-4 justify-between items-start bg-red">
        <p className=" text-sm text-slate-800 font-medium underline">
          {" "}
          April 09, 2025{" "}
        </p>
        <div className="middle-nav grid place-content-center ">
          <XlTitle content={"IBTIHEL"} className={"md:text-6xl"} />
          <XlTitle content={"BEN SALAH"} className={"md:text-4xl"} />
        </div>
        <div className="flex gap-2">
          {socialLinks.map((link, i) => (
            <a
              href={link.href}
              key={i}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={link.src} alt="social icon" width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
      <hr />

      <nav className="flex justify-between uppercase font-bold">
        <ul className="flex gap-2">
          <li>
            <Link href={"/"}>home</Link>
          </li>
          <li>
            <Link href={"/blog"}> Blog </Link>
          </li>
        </ul>

        <ul className="flex gap-2">
          <li>
            <Link href={"/shop"}> shop </Link>
          </li>
          <li>
            <Link href={"/#contact"}>contact</Link>
          </li>
        </ul>
      </nav>
      <hr />
    </header>
  );
};

export default Nav;

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

const Nav = () => {
  return (
    <nav className="flex gap-4 justify-between items-center">
      <h1 className="font-medium text-xl capitalize">Ibtihel Ben Salah</h1>
      <div className="flex gap-2">
        {socialLinks.map((link, i) => (
          <a href={link.href} key={i} target="_blank" rel="noopener noreferrer">
            <Image src={link.src} alt="social icon" width={30} height={30} />
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Nav;

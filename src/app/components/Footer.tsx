import SocialMedia from "./SocialMedia";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2">
      <a
        href="mailto:ibtihel.bensalah@outlook.fr"
        className="m-auto font-extrabold tracking-tighter uppercase"
      >
        click to send email{" "}
      </a>
      <SocialMedia w={50} h={50} />
    </footer>
  );
};

export default Footer;

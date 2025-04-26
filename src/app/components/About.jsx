import { client } from "@/sanity/client";
import AboutItem from "./AboutItem";

const About = async () => {
  const ABOUT_QUERY = `*[
    _type == "about"
  ]{
    _id,
    title,
    slug,
    content,
    image,
  }`;

  const about = await client.fetch(ABOUT_QUERY);

  return (
    <section className="grid gap-8 w-full py-6 ">
      {/* Right section with title and artworks */}
      {about.reverse().map((item, index) => {
        // Use useScroll with viewport instead of useRef

        return <AboutItem item={item} key={index} index={index} />;
      })}
    </section>
  );
};

export default About;

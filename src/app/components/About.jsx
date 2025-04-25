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
    <section className="grid gap-8 w-full p-6">
      {/* Right section with title and artworks */}
      <div className="grid gap-6 justify-items-center content-center">
        {about.reverse().map((item, index) => {
          // Use useScroll with viewport instead of useRef

          return <AboutItem item={item} index={index} />;
        })}
      </div>
    </section>
  );
};

export default About;

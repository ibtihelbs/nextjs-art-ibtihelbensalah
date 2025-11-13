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
  }|order(_createdAt desc)`;

  const about = await client.fetch(ABOUT_QUERY);

  return (
    <section className="grid gap-8 w-full py-6">
      {about.map((item, index) => (
        <AboutItem item={item} key={item._id} index={index} />
      ))}
    </section>
  );
};

export default About;

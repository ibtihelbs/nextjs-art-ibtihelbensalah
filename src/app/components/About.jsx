import { XlTitle } from "./Text";
import Image from "next/image";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/imageUrl";
import { PortableText } from "@portabletext/react";

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
  console.log(about);
  return (
    <section className="grid gap-8  bg-orange-200 w-full p-6">
      {/* Left section with static image */}
      <XlTitle content="About me" className="md:text-6xl md:text-start" />

      {/* Right section with title and artworks */}
      <div className="col-span-2 grid gap-6">
        <div className="">
          {about.reverse().map((item) => (
            <div
              key={item._id}
              className="sticky top-0 bg-white rounded shadow overflow-hidden grid grid-cols-3"
            >
              <Image
                src={urlFor(item.image).width().height().url()}
                alt={item.title}
                width={400}
                height={600}
                className="object-cover w-full h-auto"
              />
              <div className="p-3">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p> {item.content} </p>
                <div className="prose max-w-none">
                  <PortableText value={item.content} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

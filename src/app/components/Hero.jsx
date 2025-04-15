import Image from "next/image";
import { client } from "@/sanity/client";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/imageUrl";
import { XlTitle } from "./Text";
import Link from "next/link";
const Hero = async () => {
  const query = `*[_type == "blog" && slug.current == "elan-creatif-my-watercolors-on-display-in-the-heart-of-tunis"][0] {
    _id,
    title,
    slug,
    publishedAt,
    image,
    extraImages,
    tags,
    categories,
    content
  }`;
  const blog = await client.fetch(query);

  return (
    <section className="grid grid-cols-4 w-full min-h-[70vh] gap-6 ">
      <div className="col-span-3 grid grid-cols-3 gap-3">
        <div className="w-full h-full bg-red-300 col-span-2 relative">
          <Image
            src={urlFor(blog.image).width().url()}
            alt="blog"
            fill
            className="fit-cover"
          />
        </div>
        <div>
          <XlTitle content={blog.title} className={"text-start"} />
          <div className="prose max-w-none  ">
            <PortableText
              value={blog.content.slice(0, 1)}
              className="text-ellipsis"
            />
          </div>
          <div className="flex gap-2"></div>
          <Link
            href={"./blog/" + blog.slug.current}
            className=" border-solid border-2 rounded-full float-right px-4 py-1"
          >
            {" "}
            read more...{" "}
          </Link>
        </div>
        <div className="col-span-3 flex gap-3 whitespace-nowrap">
          <XlTitle
            content={"predule creative predule creative predule creative"}
            className={
              " text-6xl  overflow-hidden text-start whitespace-nowrap bg-yellow-400"
            }
          />
        </div>
      </div>
      <div className=" vr">
        <div className="relative h-2/3">
          <Image src={"/wallpaper.jpg"} alt="wallpaper" fill />
        </div>
        <XlTitle content={"wallpaper collection"} />
        <Link
          href={"/shop"}
          className="border-solid border-2 rounded-full float-right px-4 py-1"
        >
          {" "}
          purchase{" "}
        </Link>
      </div>
    </section>
  );
};

export default Hero;

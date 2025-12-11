import { client } from "@/sanity/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "../../../sanity/imageUrl";
import { XlTitle } from "../../components/Text";
const query = `*[_type == "blog" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  image,
  extraImages,
  tags,
  categories,
  content, 
  additionalImages
}`;

const page = async ({ params }) => {
  const { slug } = params;
  const blog = await client.fetch(query, { slug });
  return (
    <article className="max-w-3xl mx-auto px-4 py-10 space-y-4">
      <div className="flex justify-between">
        <p className="text-sm text-gray-500">
          {new Date(blog.publishedAt).toLocaleDateString()}
        </p>
        <div className="flex gap-1">
          {blog.categories.map((v, i) => (
            <span className="px-3 py-1 rounded-full border" key={i}>
              {v}
            </span>
          ))}
        </div>
      </div>

      {blog.image && (
        <Image
          src={urlFor(blog.image).width().url()}
          alt={blog.title}
          width={800}
          height={450}
          className="rounded-lg"
        />
      )}
      <XlTitle content={blog.title} className="lg:text-7xl" />

      <div className="prose max-w-none">
        <PortableText value={blog.content} />
      </div>

      <div className="flex gap-2 mt-4 flex-wrap">
        {blog.tags?.map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
};

export default page;

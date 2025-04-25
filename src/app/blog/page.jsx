import { client } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../sanity/imageUrl";
const ARTWORKS_QUERY = `*[_type == "blog"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  image,
  tags,
  categories,
}`;

const options = { next: { revalidate: 30 } };

const page = async () => {
  const artworks = await client.fetch(ARTWORKS_QUERY, {}, options);

  return (
    <div className=" mx-auto px-4 py-8 space-y-16 grid grid-cols-3">
      {artworks.map((post) => (
        <article key={post._id} className="space-y-4">
          <h2 className="text-2xl font-bold">{post.title}</h2>

          {post.image && (
            <Image
              src={urlFor(post.image).width().url()}
              alt={post.title}
              width={800}
              height={450}
              className="rounded-xl"
            />
          )}

          <p className="text-sm text-gray-500">
            Published on {new Date(post.publishedAt).toLocaleDateString()}
          </p>

          <div className="flex gap-2 flex-wrap">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          <Link
            href={`/blog/${post.slug.current}`}
            className="text-blue-500 underline inline-block mt-4"
          >
            Read more →
          </Link>
        </article>
      ))}
    </div>
  );
};

export default page;

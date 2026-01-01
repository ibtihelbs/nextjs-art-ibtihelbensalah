import { client } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../sanity/imageUrl";
import { XlTitle } from "../components/Text";
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
    <div className=" mx-auto px-4 py-8 space-y-16 grid md:grid-cols-3">
      {artworks.map((post) => (
        <article key={post._id} className="space-y-2">
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
            <span> {post.categories[0]}</span>
          </div>
          {post.image && (
            <Image
              src={urlFor(post.image).width().url()}
              alt={post.title}
              width={800}
              height={450}
            />
          )}

          <h2 className="text-2xl tracking-tight font-bold">{}</h2>
          <XlTitle content={post.title} className={"text-start lg:text-2xl"} />
          <div className="flex gap-2 flex-wrap">
            {post.tags?.slice(0, 3).map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>

          <Link
            href={`/blog/${post.slug.current}`}
            className="font-bold inline-block float-right px-2 py-1 border rounded-full"
          >
            Read Article
          </Link>
        </article>
      ))}
    </div>
  );
};

export default page;

import Link from "next/link";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/imageUrl";
import { XlTitle } from "../components/Text";

const options = { next: { revalidate: 30 } };

export default async function IndexPage({ searchParams }) {
  const searchTerm = await searchParams;
  const [key, value] = Object.entries(searchTerm || {})[0] || [];

  const ARTWORKS_QUERY = () => {
    const baseQuery = `*[
      _type == "artwork"
      && defined(slug.current)
    ]|order(updatedAt desc)[0...12]{
      _id,
      title,
      slug,
      category,
      medium,
      image,
      updatedAt
    }`;

    if (!key || !value) {
      console.log("no search");
      return baseQuery;
    }

    console.log("searching by:", key, value);

    return `*[
      _type == "artwork"
      && defined(slug.current)
      && ${key} match "*${value}*"
    ]|order(updatedAt desc)[0...12]{
      _id,
      title,
      slug,
      category,
      medium,
      image,
      updatedAt
    }`;
  };

  const artworks = await client.fetch(ARTWORKS_QUERY(), {}, options);
  return (
    <main className="container mx-auto min-h-screen  md:py-8">
      {value ? <Link href={"/shop"}>back to shop</Link> : ""}{" "}
      <XlTitle content={value || "shop"} />
      <ul className="grid md:grid-cols-2 md:gap-3 lg:grid-cols-3 gap-y-6">
        {artworks.map((artwork) => (
          <li key={artwork._id}>
            {artwork.image && (
              <img
                src={urlFor(artwork.image).width().height().url()}
                alt={artwork.title}
                className="w-full h-[300px] object-cover rounded-lg"
              />
            )}
            <div className="grid ">
              <h2 className="text-xl font-semibold">{artwork.title}</h2>
              <div className="flex justify-between">
                <p className="text-sm flex gap-2 text-gray-500">
                  <Link href={`/shop?category=${artwork.category}`}>
                    {artwork.category}
                  </Link>
                  <Link href={`/shop?medium=${artwork.medium}`}>
                    {artwork.medium}
                  </Link>
                </p>
                <Link
                  href={`/shop/${artwork.slug.current}`}
                  className="px-2 py-1 rounded-full border"
                >
                  {" "}
                  more{" "}
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

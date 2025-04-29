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
      updatedAt, price
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
    ]|order(updatedAt desc)[0...12]`;
  };

  const artworks = await client.fetch(ARTWORKS_QUERY(), {}, options);

  return (
    <main className="container mx-auto min-h-screen  ">
      {value ? <Link href={"/shop"}>back to shop</Link> : ""}{" "}
      <XlTitle content={value || "shop"} className={"lg:text-6xl py-4"} />
      <ul className="grid  md:grid-cols-2 md:gap-4  lg:grid-cols-3 gap-y-6">
        {artworks.map((artwork) => (
          <li key={artwork._id} className="grid gap-2 border">
            {artwork.image && (
              <img
                src={urlFor(artwork.image).width().height().url()}
                alt={artwork.title}
                className="w-full h-[300px] object-cover "
              />
            )}
            <div className="text-sm flex items-center gap-2 p-2 justify-between text-gray-500">
              <Link href={`/shop?category=${artwork.category}`}>
                {artwork.category}
              </Link>
              <hr className="w-full border-2 border-black rounded-full" />
              <Link href={`/shop?medium=${artwork.medium}`}>
                {artwork.medium}
              </Link>
            </div>
            <div className="grid gap-1 p-2">
              <XlTitle content={artwork.title} />
              <div className="flex justify-between items-start ">
                <h2 className="font-black text-xl">
                  {!artwork.price ? "Free" : artwork.price.toFixed(2) + "dt"}
                </h2>

                <Link
                  href={`/shop/${artwork.slug.current}`}
                  className="px-2 py-1 capitalize text-sm font-black rounded-full border"
                >
                  {" "}
                  details{" "}
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

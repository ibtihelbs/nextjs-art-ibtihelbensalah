import Link from "next/link";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/imageUrl";
import { XlTitle } from "../components/Text";

export default async function IndexPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const [key, value] = Object.entries(resolvedParams || {})[0] || [];

  const buildQuery = () => {
    const baseQuery = `*[_type == "artwork"]{
  _id,
  title,
  slug,
  category,
  medium,
  price,
  sold,
  image,
  additionalImages
}`;

    if (!key || !value) {
      return baseQuery;
    }

    // Fields that are arrays and should use 'in' operator
    const arrayFields = ["tags", "categories", "materials"];

    // Check if the key is an array field
    const isArrayField = arrayFields.includes(key);

    // Build the filter condition based on field type
    const filterCondition = isArrayField
      ? `"${value}" in ${key}`
      : `${key} match "*${value}*"`;
    console.log(filterCondition);
    return `*[
    _type == "artwork"
    && defined(slug.current)
    && ${filterCondition}
  ]{
  _id,
  title,
  slug,
  category,
  medium,
  price,
  sold,
  image,
  additionalImages
}|order(_updatedAt desc)[0...12]`;
  };

  const query = buildQuery();
  const artworks = await client.fetch(query, {}, { next: { revalidate: 30 } });
  console.log(artworks);
  return (
    <main className="container mx-auto min-h-screen px-4">
      {value && (
        <Link
          href="/shop"
          className="text-blue-600 hover:underline inline-block mb-2"
        >
          ← back to shop
        </Link>
      )}

      <XlTitle content={value || "shop"} className="lg:text-6xl py-4" />

      {!artworks || artworks.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No artworks found.</p>
      ) : (
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {artworks.map((artwork) => (
            <li
              key={artwork._id}
              className="grid gap-1 items-start border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {artwork.image && (
                <img
                  src={urlFor(artwork.image).width(800).height(600).url()}
                  alt={artwork.title}
                  className="w-full h-[300px] object-cover"
                />
              )}

              <div className="text-sm flex items-center justify-between px-3 py-2 gap-2 text-gray-500">
                <Link
                  href={`/shop?category=${artwork.category}`}
                  className="hover:text-black transition-colors"
                >
                  {artwork.category}
                </Link>
                <hr className="flex-1 border-t-2 border-black rounded-full" />
                <Link
                  href={`/shop?medium=${artwork.medium}`}
                  className="hover:text-black transition-colors"
                >
                  {artwork.medium}
                </Link>
              </div>

              <div className="grid gap-2 px-3 pb-3">
                <XlTitle content={artwork.title} />
                <div className="flex justify-between items-center">
                  <h2 className="font-black text-xl">
                    {artwork.price === null || artwork.price === 0
                      ? "Free"
                      : `${artwork.price.toFixed(2)} dt`}
                  </h2>

                  <Link
                    href={`/shop/${artwork.slug.current}`}
                    className="px-3 py-1.5 capitalize text-sm font-black rounded-full border border-black hover:bg-black hover:text-white transition-colors"
                  >
                    details
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

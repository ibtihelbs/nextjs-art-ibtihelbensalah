import Link from "next/link";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/imageUrl";
import { XlTitle } from "../components/Text";
import { LinkTracking } from "./ShopTracking";

export default async function IndexPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const [key, value] = Object.entries(resolvedParams || {})[0] || [];

  const buildQuery = () => {
    const baseFields = `
      _id,
      title,
      slug,
      category,
      medium,
      editions,
      price,
      sold,
      image,
      gallery,
      tags
    `;

    // Default query when no filters
    if (!key || !value) {
      return {
        query: `*[
          _type == "artwork"
          && defined(slug.current)
        ]{${baseFields}} | order(_createdAt desc)[0...12]`,
        params: {},
      };
    }

    let query = "";
    let params = {};

    // ARRAY FIELDS
    if (key === "tags" || key === "editions") {
      query = `*[
        _type == "artwork"
        && defined(slug.current)
        && count(${key}[@ match $filterValue]) > 0
      ]{${baseFields}} | order(_createdAt desc)[0...12]`;
      params = { filterValue: value };
    }
    // STRING FIELDS
    else if (key === "category" || key === "medium") {
      query = `*[
        _type == "artwork"
        && defined(slug.current)
        && ${key} == $filterValue
      ]{${baseFields}} | order(_createdAt desc)[0...12]`;
      params = { filterValue: value };
    }
    // BOOLEAN FIELDS
    else if (key === "sold") {
      const boolValue = value === "true";
      query = `*[
        _type == "artwork"
        && defined(slug.current)
        && sold == $filterValue
      ]{${baseFields}} | order(_createdAt desc)[0...12]`;
      params = { filterValue: boolValue };
    }
    // DEFAULT - fallback to all artworks
    else {
      query = `*[
        _type == "artwork"
        && defined(slug.current)
      ]{${baseFields}} | order(_createdAt desc)[0...12]`;
      params = {};
    }

    return { query, params };
  };

  try {
    const queryConfig = buildQuery();
    const artworks = await client.fetch(queryConfig.query, queryConfig.params, {
      next: { revalidate: 30 },
    });

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
                className="grid gap-1 items-start border rounded-lg overflow-hidden hover:shadow-lg transition-shadow relative"
              >
                {artwork.image && (
                  <img
                    src={urlFor(artwork.image).width(800).height(600).url()}
                    alt={artwork.title || artwork.image.alt || "Artwork image"}
                    className="w-full h-[300px] object-cover"
                  />
                )}
                {artwork.sold == true && (
                  <span className="bg-red-700 text-amber-50 absolute top-1 right-1 px-2 py-1 rounded-full">
                    sold
                  </span>
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
                    <LinkTracking
                      track={artwork.slug.current}
                      id={artwork._id}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    );
  } catch (error) {
    console.error("Failed to fetch artworks:", error);
    return (
      <main className="container mx-auto min-h-screen px-4">
        <XlTitle content="shop" className="lg:text-6xl py-4" />
        <p className="text-red-500 text-center py-8">
          Failed to load artworks. Please try again later.
        </p>
      </main>
    );
  }
}

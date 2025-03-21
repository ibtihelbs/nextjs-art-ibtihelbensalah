import Link from "next/link";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/imageUrl";

const ARTWORKS_QUERY = `*[
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

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const artworks = await client.fetch(ARTWORKS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Freebies</h1>
      <ul className="grid md:grid-cols-2 md:gap-3 lg:grid-cols-3 gap-y-6">
        {artworks.map((artwork) => (
          <li key={artwork._id} className="hover:underline">
            <Link
              href={`/${artwork.slug.current}`}
              className="grid items-center gap-4"
            >
              {artwork.image && (
                <img
                  src={urlFor(artwork.image).width().height().url()}
                  alt={artwork.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold">{artwork.title}</h2>
                <p className="text-sm text-gray-500">
                  {artwork.category} · {artwork.medium}
                </p>
                <p>{new Date(artwork.updatedAt).toLocaleDateString()}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

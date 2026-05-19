import { client } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../sanity/imageUrl";
import { XlTitle } from "../components/Text";

const COMMISSIONS_QUERY = `*[_type == "commission" && isActive == true] | order(_createdAt desc) {
  _id,
  title,
  slug,
  commissionType,
  subtitle,
  heroImage,
  isActive,
}`;

const options = { next: { revalidate: 30 } };

const page = async () => {
  const commissions = await client.fetch(COMMISSIONS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen px-4">
      <Link
        href="/shop"
        className="text-blue-600 hover:underline inline-block mb-2"
      >
        ← back to shop
      </Link>

      <XlTitle content="commissions" className="lg:text-6xl py-4" />

      {!commissions || commissions.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No commissions found.</p>
      ) : (
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {commissions.map((commission) => (
            <li
              key={commission._id}
              className="grid gap-1 items-start border rounded-lg overflow-hidden hover:shadow-lg transition-shadow relative"
            >
              <Link
                href={`/commission/${commission.slug.current}`}
                className="group block relative w-full h-[300px]"
              >
                {commission.heroImage && (
                  <Image
                    src={urlFor(commission.heroImage)
                      .width(800)
                      .height(600)
                      .url()}
                    fill
                    alt={commission.title}
                    className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </Link>

              <div className="text-sm flex items-center justify-between px-3 py-2 gap-2 text-gray-500">
                <span className="capitalize">{commission.commissionType}</span>
                <hr className="flex-1 border-t-2 border-black rounded-full" />
                <span className="text-xs text-gray-400">commission</span>
              </div>

              <div className="grid gap-2 px-3 pb-3">
                <XlTitle content={commission.title} />
                {commission.subtitle?.fr && (
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">
                      {commission.subtitle.fr}
                    </p>
                    <Link
                      href={`/commission/${commission.slug.current}`}
                      className="px-3 py-1.5 capitalize text-sm font-black rounded-full border border-black hover:bg-black hover:text-white transition-colors"
                    >
                      details
                    </Link>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default page;

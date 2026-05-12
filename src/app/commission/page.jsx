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
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-6xl font-serif text-center mb-4">
        Commissions
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Bespoke artwork created just for you. Choose your style, size, and
        subject.
      </p>

      {commissions.length === 0 ? (
        <p className="text-center text-gray-500">
          No active commissions at this time.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {commissions.map((commission) => (
            <Link
              key={commission._id}
              href={`/commission/${commission.slug.current}`}
              className="group block"
            >
              {commission.heroImage && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                  <Image
                    src={urlFor(commission.heroImage).width(600).url()}
                    alt={commission.title}
                    width={600}
                    height={450}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <XlTitle
                content={commission.title}
                className="text-xl md:text-2xl text-start"
              />
              <p className="text-sm text-gray-500 mt-1 capitalize">
                {commission.commissionType}
              </p>
              {commission.subtitle?.fr && (
                <p className="text-sm text-gray-600 mt-2">
                  {commission.subtitle.fr}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;

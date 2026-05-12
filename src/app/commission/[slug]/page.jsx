import { client } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../../sanity/imageUrl";
import { XlTitle } from "../../components/Text";
import TiersList from "../../components/TiersList";
const COMMISSION_QUERY = `*[_type == "commission" && slug.current == $slug][0] {
  _id,
  title,
  commissionType,
  heroImage,
  subtitle,
  description,
  readyWorksLink,
  readyWorksLinkText,
  sizes,
  complexityTiers,
  specialOccasion,
  processSteps,
  contactWhatsapp,
  contactInstagram,
  depositPercentage,
}`;

const options = { next: { revalidate: 30 } };

const page = async ({ params }) => {
  const { slug } = await params;
  const commission = await client.fetch(COMMISSION_QUERY, { slug }, options);

  if (!commission) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl mb-4">Commission Not Found</h1>
        <p className="text-sm text-gray-500 mb-8">
          This commission type is not currently available.
        </p>
        <Link href="/commissions" className="px-6 py-2 rounded-full border">
          View All Commissions
        </Link>
      </div>
    );
  }

  // Default contact values if not set in schema
  const whatsapp = commission.contactWhatsapp || "+21692398964";
  const instagram = commission.contactInstagram || "paintings.by.ibs";
  const deposit = commission.depositPercentage || 50;

  return (
    <article className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      {/* Hero Section */}
      <div className="space-y-2 text-center">
        <div className="flex justify-between w-full ">
          {commission.subtitle?.fr && (
            <p className="text-sm rounded-full border px-2 py-1 italic">
              {commission.subtitle.fr}
            </p>
          )}
          {commission.subtitle?.ar && (
            <p
              className="text-sm rounded-full border px-2 py-1 font-arabic"
              dir="rtl"
            >
              {commission.subtitle.ar}
            </p>
          )}
        </div>

        {commission.heroImage && (
          <div className="relative aspect-[4/3] max-w-2xl mx-auto">
            <Image
              src={urlFor(commission.heroImage).width(800).url()}
              alt={commission.title}
              fill
              loading="eager"
              className="rounded-lg object-cover w-full h-full"
            />
            {commission.specialOccasion?.isActive && (
              <div className="  p-6  space-y-1">
                <h3 className="text-xl absolute top-0 font-medium font-[family-name:var(--font-title)] text-white">
                  {commission.specialOccasion.eventName?.fr}
                </h3>
                <div className="text-sm text-white font-bold absolute bottom-0 right-0 text-right p-6">
                  <p>
                    Order by:{" "}
                    {new Date(
                      commission.specialOccasion.orderDeadline,
                    ).toLocaleDateString("fr-FR")}
                  </p>
                  <p>
                    Guaranteed delivery by:{" "}
                    {new Date(
                      commission.specialOccasion.deliveryGuarantee,
                    ).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
        {commission.description?.fr && (
          <div className="text-xs max-w-96 mx-auto">
            <p className="text-gray-700">{commission.description.fr}</p>
          </div>
        )}
        <XlTitle
          content={commission.title}
          className="lg:text-7xl text-center"
        />
      </div>

      {/* Sizes & Pricing Table */}
      {commission.sizes && commission.sizes.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-medium border-b pb-2">
            Tarifs · Pricing
          </h2>

          <TiersList commission={commission} />

          {/* Express Fee Note */}
          {commission.sizes[0]?.expressFee && (
            <p className="text-sm text-gray-500 text-right italic">
              +{commission.sizes[0].expressFee} TND pour express (livraison
              accélérée)
            </p>
          )}
        </section>
      )}

      {/* How It Works */}
      {commission.processSteps && commission.processSteps.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-medium border-b pb-2">
            Comment commander · How to Order
          </h2>
          <div className="space-y-4">
            {commission.processSteps.map((step) => (
              <div key={step.stepNumber} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full border flex items-center justify-center font-medium text-sm">
                  {String(step.stepNumber).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800">{step.instruction?.fr}</p>
                  <p className="text-sm text-gray-500 font-arabic" dir="rtl">
                    {step.instruction?.ar}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg mt-4 text-center text-sm text-gray-600">
            💰 Acompte de {deposit}% requis pour démarrer la commande
          </div>
        </section>
      )}

      {/* Link to Ready Works */}
      {commission.readyWorksLink && (
        <section className="text-center py-4">
          <Link
            href={commission.readyWorksLink}
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border hover:bg-gray-50 transition"
          >
            {commission.readyWorksLinkText?.fr || "Voir mes œuvres disponibles"}
            <span aria-hidden="true">→</span>
          </Link>
        </section>
      )}

      {/* Contact Section */}
      <section className="space-y-4 text-center pt-6 border-t">
        <h2 className="text-xl font-medium">Réserver · Reserve</h2>
        <div className="flex flex-row gap-4 justify-center">
          <a
            href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-400 rounded-full hover:bg-gray-50 transition"
          >
            <Image
              src={"/png/brand-whatsapp.png"}
              alt="social icon"
              width={20}
              height={20}
            />
          </a>
          <a
            href={`https://www.instagram.com/${instagram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-400 rounded-full hover:bg-gray-50 transition"
          >
            <Image
              src={"/png/003-instagram-1.png"}
              alt="social icon"
              width={20}
              height={20}
            />
          </a>
        </div>
        <p className="text-sm text-gray-500">
          Contactez-moi directement pour discuter de votre projet
        </p>
      </section>
    </article>
  );
};

export default page;

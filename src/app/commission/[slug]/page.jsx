import { client } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../../sanity/imageUrl";
import { XlTitle, Title } from "../../components/Text";
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
      <main className="container mx-auto min-h-screen px-4 py-20 text-center">
        <h1 className="text-3xl mb-4">Commission Not Found</h1>
        <p className="text-sm text-gray-500 mb-8">
          This commission type is not currently available.
        </p>
        <Link href="/commission" className="text-blue-600 hover:underline">
          ← Back to commissions
        </Link>
      </main>
    );
  }

  // Default contact values if not set in schema
  const whatsapp = commission.contactWhatsapp || "+21692398964";
  const instagram = commission.contactInstagram || "paintings.by.ibs";
  const deposit = commission.depositPercentage || 50;

  return (
    <main className="container mx-auto p-8">
      <Link
        href="/commissions"
        className="text-blue-600 hover:underline inline-block mb-2"
      >
        ← Back to commissions
      </Link>

      <article className="max-w-none grid md:grid-cols-2 md:gap-10 gap-2 items-start">
        {/* Left Column - Image & Subtitles */}
        <div className="space-y-2">
          <XlTitle
            content={commission.title}
            className="text-start lg:text-5xl"
          />

          {commission.heroImage && (
            <div className="relative h-[50vh]">
              <Image
                src={urlFor(commission.heroImage).width(800).height(600).url()}
                fill
                alt={commission.title}
                className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {commission.specialOccasion?.isActive && (
                <div className="absolute top-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-[family-name:var(--font-title)] text-white">
                    {commission.specialOccasion.eventName?.fr}
                  </h3>
                </div>
              )}
            </div>
          )}

          {/* Subtitles */}
          <div className="flex gap-2 flex-wrap">
            {commission.subtitle?.fr && (
              <span className="text-sm border border-white px-3 py-1 rounded-full">
                {commission.subtitle.fr}
              </span>
            )}
            {commission.subtitle?.ar && (
              <span
                className="text-sm border border-white px-3 py-1 rounded-full font-arabic"
                dir="rtl"
              >
                {commission.subtitle.ar}
              </span>
            )}
          </div>

          {commission.description?.fr && (
            <p className="text-sm text-gray-600">{commission.description.fr}</p>
          )}
          {/* How It Works */}
          {commission.processSteps && commission.processSteps.length > 0 && (
            <div>
              <Title content="How to Order :" className="text-start mb-4" />
              <div className="space-y-4">
                {commission.processSteps.map((step) => (
                  <div key={step.stepNumber} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center font-medium text-sm">
                      {String(step.stepNumber).padStart(2, "0")}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800">{step.instruction?.fr}</p>
                      <p
                        className="text-sm text-gray-500 font-arabic"
                        dir="rtl"
                      >
                        {step.instruction?.ar}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mt-4 text-sm text-gray-600">
                💰 Acompte de {deposit}% requis pour démarrer la commande
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Details */}
        <div className="grid gap-6">
          {/* Commission Type Badge */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Title content="Type :" className="text-start" />
              <p className="capitalize">{commission.commissionType}</p>
            </div>
            {deposit && (
              <div>
                <Title content="Deposit :" className="text-start" />
                <p>{deposit}%</p>
              </div>
            )}
          </div>

          {/* Special Occasion Details */}
          {commission.specialOccasion?.isActive && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-1">
              <Title content="Special Occasion" className="text-start" />
              <div className="text-sm">
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

          {/* Sizes & Pricing */}
          {commission.sizes && commission.sizes.length > 0 && (
            <div>
              <Title content="Pricing :" className="text-start mb-4" />
              <TiersList commission={commission} />
              {commission.sizes[0]?.expressFee && (
                <p className="text-sm text-gray-500 text-right italic mt-2">
                  +{commission.sizes[0].expressFee} TND pour express (livraison
                  accélérée)
                </p>
              )}
            </div>
          )}

          {/* Ready Works Link */}
          {commission.readyWorksLink && (
            <div>
              <Link
                href={commission.readyWorksLink}
                target="_blank"
                className="text-blue-600 hover:underline inline-flex items-center gap-2"
              >
                {commission.readyWorksLinkText?.fr ||
                  "Voir mes œuvres disponibles"}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}

          {/* Contact Section */}
          <div className="pt-6 border-t">
            <Title content="Reserve :" className="text-start mb-4" />
            <div className="flex gap-4 items-center">
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-black hover:bg-gray-100 transition"
              >
                <Image
                  src={"/png/brand-whatsapp.png"}
                  alt="WhatsApp"
                  width={20}
                  height={20}
                />
              </a>
              <a
                href={`https://www.instagram.com/${instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-black hover:bg-gray-100 transition"
              >
                <Image
                  src={"/png/003-instagram-1.png"}
                  alt="Instagram"
                  width={20}
                  height={20}
                />
              </a>
              <p className="text-sm text-gray-500">
                Contact me directly to discuss your project!
              </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

export default page;

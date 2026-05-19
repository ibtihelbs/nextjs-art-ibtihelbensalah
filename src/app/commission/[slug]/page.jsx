import { client } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../../sanity/imageUrl";
import { XlTitle, Title } from "../../components/Text";
import TiersList from "../../components/TiersList";
import CommissionClient from "../../components/CommissionClient";

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
  galleryImages[] {
    _key,
    image,
    title
  }
}`;

const options = { next: { revalidate: 3600 } };

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const commission = await client.fetch(COMMISSION_QUERY, { slug });

  if (!commission) {
    return {
      title: "Commission Not Found",
      robots: { index: false },
    };
  }

  return {
    title: `${commission.title} · Commissions Florales · Ibtihel Ben Salah`,
    description: commission.description?.fr?.substring(0, 160),
    openGraph: {
      title: `${commission.title} · Peintures Florales Personnalisées`,
      description: commission.description?.fr,
      images: commission.heroImage ? [urlFor(commission.heroImage).url()] : [],
      type: "website",
    },
    alternates: {
      canonical: `/commission/${slug}`,
    },
  };
}

// Generate static paths for ISR
export async function generateStaticParams() {
  const commissions = await client.fetch(`
    *[_type == "commission"] {
      "slug": slug.current
    }
  `);
  return commissions.map(({ slug }) => ({ slug }));
}

const page = async ({ params }) => {
  const { slug } = await params;
  const commission = await client.fetch(COMMISSION_QUERY, { slug }, options);

  if (!commission) {
    return (
      <main className="container mx-auto min-h-screen px-4 py-20 text-center">
        <h1 className="text-3xl mb-4 font-[family-name:var(--font-title)]">
          Commission Not Found
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          This commission type is not currently available.
        </p>
        <Link
          href="/commission"
          className="text-sm uppercase tracking-wider hover:text-black transition"
        >
          ← Back to commissions
        </Link>
      </main>
    );
  }

  // Default values with fallbacks
  const whatsapp = commission.contactWhatsapp || "+21692398964";
  const instagram = commission.contactInstagram || "paintings.by.ibs";
  const deposit = commission.depositPercentage || 50;
  const galleryImages = commission.galleryImages || [];

  // Set deadline based on commission type
  // Floral commissions end June 30, 2026
  // Mother's Day special has its own deadline from CMS
  const isFloralCommission = commission.commissionType === "florals";
  const defaultDeadline = isFloralCommission
    ? new Date("2026-06-30T23:59:00")
    : null;

  const deadline = commission.specialOccasion?.orderDeadline
    ? new Date(commission.specialOccasion.orderDeadline)
    : defaultDeadline;

  // Add structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: commission.title,
    description: commission.description?.fr,
    image: commission.heroImage
      ? urlFor(commission.heroImage).url()
      : undefined,
    brand: {
      "@type": "Brand",
      name: "Ibtihel Ben Salah",
    },
    offers: commission.sizes
      ?.flatMap((size) =>
        commission.complexityTiers?.map((tier) => {
          const price = tier.prices?.find((p) => p.sizeId === size._id);
          return price
            ? {
                "@type": "Offer",
                price: price.min,
                priceCurrency: "TND",
                availability: "https://schema.org/PreOrder",
                eligibleRegion: {
                  "@type": "Country",
                  name: "TN",
                },
              }
            : null;
        }),
      )
      .filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Urgency Banner - Shows for both Mother's Day AND Floral deadline */}
      {(commission.specialOccasion?.isActive || isFloralCommission) && (
        <div className="bg-black text-white text-center py-3 px-4" role="alert">
          <div className="container mx-auto flex items-center justify-center gap-3 flex-wrap text-sm">
            {commission.specialOccasion?.isActive ? (
              // Mother's Day special banner
              <>
                <span className="uppercase tracking-wider text-xs opacity-70">
                  {commission.specialOccasion.eventName?.fr || "Fête des mères"}
                </span>
                <span className="opacity-30">·</span>
                <span className="font-medium" id="countdown-timer">
                  Chargement...
                </span>
                <span className="opacity-30">·</span>
                <span className="text-xs opacity-70">
                  Livraison garantie avant le{" "}
                  {new Date(
                    commission.specialOccasion.deliveryGuarantee,
                  ).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                  })}
                </span>
              </>
            ) : (
              // Floral commission deadline banner
              <>
                <span className="uppercase tracking-wider text-xs opacity-70">
                  COMMISSIONS FLORALES
                </span>
                <span className="opacity-30">·</span>
                <span className="font-medium" id="countdown-timer">
                  Chargement...
                </span>
                <span className="opacity-30">·</span>
                <span className="text-xs opacity-70">
                  Dernier délai pour commander
                </span>
              </>
            )}
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link href="/commission" className="hover:text-black transition">
            ← commissions
          </Link>
          <span>·</span>
          <span className="text-gray-600">{commission.commissionType}</span>
        </nav>

        <article className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Image & Main Content */}
          <div className="space-y-6">
            {/* Hero Image */}
            {commission.heroImage && (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={urlFor(commission.heroImage)
                    .width(800)
                    .height(600)
                    .url()}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  alt={commission.title}
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>
            )}

            {/* Title Section */}
            <div>
              <p className="text-xs tracking-wider text-gray-400 uppercase mb-2">
                {commission.commissionType === "florals"
                  ? "Compositions florales · Acrylique sur toile"
                  : "Commissions personnalisées"}
              </p>
              <XlTitle
                content={commission.title}
                className="text-start text-3xl sm:text-4xl lg:text-5xl mb-2"
              />
              {commission.subtitle?.ar && (
                <p className="text-sm text-gray-500 italic mb-3" dir="rtl">
                  {commission.subtitle.ar}
                </p>
              )}
              {commission.specialOccasion?.isActive && (
                <p className="text-xs tracking-wider uppercase text-gray-600 border-l-2 border-black pl-3 mb-4">
                  {commission.specialOccasion.eventName?.fr}
                </p>
              )}
              {commission.description?.fr && (
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {commission.description.fr}
                </p>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="w-1 h-1 bg-black rounded-full"></span>
                <span>Peint à la main — unique &amp; personnalisé</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="w-1 h-1 bg-black rounded-full"></span>
                <span>Acompte {deposit}% · solde à la livraison</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="w-1 h-1 bg-black rounded-full"></span>
                <span>Livraison via Poste Tunisienne</span>
              </div>
            </div>

            {/* Gallery Section */}
            {galleryImages.length > 0 && (
              <div className="pt-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-xs tracking-wider uppercase text-gray-400">
                    Œuvres florales
                  </span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
                  {galleryImages.slice(0, 4).map((img, idx) => (
                    <div
                      key={img._key}
                      className="aspect-square overflow-hidden bg-gray-100 cursor-pointer group"
                    >
                      {img.image ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={urlFor(img.image).width(400).height(400).url()}
                            fill
                            alt={img.title || `Floral artwork ${idx + 1}`}
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs uppercase tracking-wider">
                          à venir
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Process Steps */}
            {commission.processSteps && commission.processSteps.length > 0 && (
              <div className="pt-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-xs tracking-wider uppercase text-gray-400">
                    Comment commander
                  </span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
                  {commission.processSteps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="bg-white p-4 transition hover:bg-gray-50"
                    >
                      <div className="font-serif text-3xl text-gray-200 mb-2">
                        {String(step.stepNumber).padStart(2, "0")}
                      </div>
                      <p className="text-xs text-gray-800 leading-relaxed mb-1">
                        {step.instruction?.fr}
                      </p>
                      <p
                        className="text-[11px] text-gray-400 leading-relaxed"
                        dir="rtl"
                      >
                        {step.instruction?.ar}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
                  💰 Acompte de {deposit}% requis pour démarrer. Solde à la
                  livraison.
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Pricing & Contact */}
          <div className="space-y-8">
            {/* Commission Type & Deposit */}
            <div className="grid grid-cols-2 gap-4 pb-2 border-b border-gray-200">
              <div>
                <Title
                  content="Type :"
                  className="text-start text-xs tracking-wider"
                />
                <p className="text-sm capitalize text-gray-600">
                  {commission.commissionType}
                </p>
              </div>
              {deposit && (
                <div>
                  <Title
                    content="Acompte :"
                    className="text-start text-xs tracking-wider"
                  />
                  <p className="text-sm text-gray-600">{deposit}%</p>
                </div>
              )}
            </div>

            {/* Special Occasion Details - Only for Mother's Day */}
            {commission.specialOccasion?.isActive && (
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 border border-gray-200">
                <Title
                  content="Offre Fête des mères"
                  className="text-start text-sm"
                />
                <div className="text-xs space-y-1 text-gray-600">
                  <p>
                    🗓️ Commander avant le :{" "}
                    {new Date(
                      commission.specialOccasion.orderDeadline,
                    ).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                  <p>
                    🚚 Livraison garantie pour le :{" "}
                    {new Date(
                      commission.specialOccasion.deliveryGuarantee,
                    ).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                  {isFloralCommission && (
                    <p className="text-green-600 font-medium mt-2">
                      ✨ Tarifs promotionnels pour la Fête des mères
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Pricing Section */}
            {commission.sizes && commission.sizes.length > 0 && (
              <div>
                <div className="mb-4">
                  <Title
                    content="Tarifs &amp; Formats"
                    className="text-start text-lg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Toile et matériaux inclus. Choisissez votre format.
                  </p>
                  {commission.specialOccasion?.isActive && (
                    <p className="text-xs text-green-600 mt-1">
                      🎁 Tarifs spéciaux Fête des mères
                    </p>
                  )}
                </div>
                <TiersList commission={commission} />
                {commission.sizes[0]?.expressFee && (
                  <p className="text-xs text-gray-500 text-right italic mt-3">
                    +{commission.sizes[0].expressFee} TND pour express
                    (livraison accélérée)
                  </p>
                )}
              </div>
            )}

            {/* Deadline Notice - For Floral Commissions */}
            {isFloralCommission && !commission.specialOccasion?.isActive && (
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                <p className="text-xs text-yellow-800 text-center">
                  ⏰ Dernier délai pour les commandes florales :{" "}
                  <strong>30 juin 2026</strong>
                </p>
              </div>
            )}

            {/* Ready Works Link */}
            {commission.readyWorksLink && (
              <div className="text-center py-2">
                <Link
                  href={commission.readyWorksLink}
                  target="_blank"
                  className="text-xs tracking-wider uppercase text-gray-500 border-b border-gray-200 pb-1 hover:text-black hover:border-black transition inline-flex items-center gap-2"
                >
                  {commission.readyWorksLinkText?.fr ||
                    "Voir mes œuvres disponibles"}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            )}

            {/* Contact Section */}
            <div className="border border-black p-6 space-y-4">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl mb-2">
                  Prête à créer
                  <br />
                  <em className="not-italic">votre œuvre ?</em>
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">
                  Contactez-moi directement pour discuter de votre projet —
                  couleurs, fleurs, format, occasion.
                </p>
                {commission.subtitle?.ar && (
                  <p className="text-xs text-gray-400" dir="rtl">
                    تواصل معي لمناقشة تفاصيل لوحتك الخاصة
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-3 flex items-start gap-2">
                  <span className="text-black">→</span>
                  Acompte de {deposit}% requis pour démarrer. Solde à la
                  livraison.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 border border-gray-200 hover:border-black transition bg-black text-white"
                >
                  <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                    <Image
                      src={"/png/brand-whatsapp.png"}
                      alt="WhatsApp"
                      width={18}
                      height={18}
                      className="brightness-0 invert"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">WhatsApp</span>
                  </div>
                </a>

                <a
                  href={`https://www.instagram.com/${instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 border border-gray-200 hover:border-black transition"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Image
                      src={"/png/003-instagram-1.png"}
                      alt="Instagram"
                      width={18}
                      height={18}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Instagram · Art</span>
                    <span className="text-xs text-gray-500">@{instagram}</span>
                  </div>
                </a>

                <a
                  href="mailto:ibtihel.bensalah@outlook.fr"
                  className="flex items-center gap-3 text-xs text-gray-500 hover:text-black transition"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  ibtihel.bensalah@outlook.fr
                </a>
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* Client-side interactive component */}
      <CommissionClient
        whatsapp={whatsapp}
        instagram={instagram}
        deadline={deadline}
        isSpecialOccasion={commission.specialOccasion?.isActive || false}
        occasionName={commission.specialOccasion?.eventName?.fr}
      />
    </>
  );
};

export default page;

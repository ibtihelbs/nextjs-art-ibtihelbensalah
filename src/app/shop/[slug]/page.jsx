import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import Download from "@/app/components/Download";
import { XlTitle, Title } from "@/app/components/Text";
import ImageGallery from "./ImageGallery";
import { PortableText } from "@portabletext/react";
const { projectId, dataset } = client.config();
const builder = imageUrlBuilder({ projectId, dataset });
const urlFor = (source) => (source ? builder.image(source) : null);
// WhatsApp Button Component
const WhatsAppButton = ({ postTitle, pageUrl }) => {
  const phoneNumber = "21692398964";
  const message = `Hello Ibtihel, I'm interested in "${postTitle}" painting. I saw it here: ${pageUrl}`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-red-400 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      Ask on WhatsApp
    </a>
  );
};
// Portable Text components for rich text rendering
const components = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
  },
};
// Instagram Button Component
const InstagramButton = ({ postTitle, pageUrl }) => {
  const instagramUsername = "paintings.by.ibs";
  const message = `Hi Ibtihel! I'm interested in your "${postTitle}" painting. I saw it here: ${pageUrl}`;
  const instagramUrl = `https://ig.me/m/${instagramUsername}`;

  return (
    <a
      href={instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-amber-600 hover:opacity-90 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
      Message on Instagram
    </a>
  );
};

export default async function PostPage({ params }) {
  try {
    const { slug } = await params;

    const POST_QUERY = `*[_type == "artwork" && slug.current == $slug][0]{
      title,
      slug,
      category,
      medium,
      editions,
      image {
        asset,
        alt,
        caption
      },
      additionalImages[] {
        asset,
        alt,
        caption
      },
      description,
      price,
      sold,
      tags,
      digitalFiles[] {
        asset,
        label
      },
      files[] {
        asset,
        label
      }
    }`;
    const post = await client.fetch(POST_QUERY, { slug });

    if (!post) {
      notFound();
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://ibtihelbensalah-art.vercel.app";
    const pageUrl = `${baseUrl}/shop/${slug}`;

    // Helper function to get image URL with alt text
    const getImageProps = (image) => {
      if (!image) return null;
      return {
        src: urlFor(image).width(800).url(),
        alt: image.alt || post.title || "Artwork image",
        caption: image.caption || null,
      };
    };

    const mainImage = getImageProps(post.image);
    const additionalImages =
      post.additionalImages?.map((img) => getImageProps(img)).filter(Boolean) ||
      [];

    return (
      <main className="container mx-auto p-8">
        <Link href="/shop" className="hover:underline block">
          ← Back to all artwork
        </Link>

        <article className="max-w-none grid md:grid-cols-2 md:gap-10 gap-2 items-start">
          <div className="space-y-2">
            <XlTitle content={post.title} className="text-start lg:text-5xl" />

            <ImageGallery
              mainImage={mainImage}
              additionalImages={additionalImages}
            />
          </div>

          <div className="grid gap-2">
            {/* Content */}
            {post.description && (
              <div className="prose prose-lg max-w-none mb-12">
                <PortableText
                  value={post.description}
                  components={components}
                />
              </div>
            )}

            {/* Social Buttons Section */}

            <div className="flex flex-wrap gap-3">
              <WhatsAppButton postTitle={post.title} pageUrl={pageUrl} />
              <InstagramButton postTitle={post.title} pageUrl={pageUrl} />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {post.category && (
                <div>
                  <Title content="Category :" className={"text-start"} />
                  <Link
                    href={`/shop?category=${encodeURIComponent(post.category)}`}
                    className="text-blue-600 hover:underline"
                  >
                    {post.category}
                  </Link>
                </div>
              )}

              {post.medium && (
                <div>
                  <Title content="Medium :" className={"text-start"} />
                  <Link
                    href={`/shop?medium=${encodeURIComponent(post.medium)}`}
                    className="text-blue-600 hover:underline"
                  >
                    {post.medium}
                  </Link>
                </div>
              )}

              {post.editions?.length > 0 && (
                <div>
                  <Title content="Editions :" className={"text-start"} />
                  <div className="flex flex-wrap gap-2">
                    {post.editions.map((edition) => (
                      <Link
                        key={edition}
                        href={`/shop?editions=${encodeURIComponent(edition)}`}
                        className="bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
                      >
                        {edition}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Title content="Price :" className={"text-start"} />
                <p>
                  {post.sold ? (
                    <span className="text-red-500 font-semibold">SOLD</span>
                  ) : !post.price ? (
                    "free"
                  ) : (
                    post.price.toFixed(2) + " dt"
                  )}
                </p>
              </div>
            </div>

            {post.tags?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/shop?tags=${encodeURIComponent(tag)}`}
                      className="border border-white px-3 py-1 rounded-full text-sm hover:bg-gray-100"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {post.files?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Printable Files</h3>
                <ul className="list-disc pl-5">
                  {post.files.map((file, index) => (
                    <Download
                      key={index}
                      file={file}
                      dataset={dataset}
                      projectId={projectId}
                    />
                  ))}
                </ul>
              </div>
            )}

            {post.digitalFiles?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Digital Files</h3>
                <ul>
                  {post.digitalFiles.map((file, index) => (
                    <Download
                      key={index}
                      file={file}
                      dataset={dataset}
                      projectId={projectId}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </article>
      </main>
    );
  } catch (error) {
    console.error("Error in PostPage:", error);
    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8">
        <h1 className="text-4xl font-bold mb-8">Error Loading Artwork</h1>
        <p className="mb-4">There was an error loading the artwork data.</p>
        <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
          {error.message}
        </pre>
        <Link href="/shop" className="hover:underline mt-4 block">
          ← Back to all artwork
        </Link>
      </main>
    );
  }
}

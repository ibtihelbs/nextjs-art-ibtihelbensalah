import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import Download from "@/app/components/Download";
import { XlTitle, Title } from "@/app/components/Text";
const { projectId, dataset } = client.config();
const builder = imageUrlBuilder({ projectId, dataset });
const urlFor = (source) => (source ? builder.image(source) : null);

export default async function PostPage({ params }) {
  try {
    const { slug } = await params;

    const POST_QUERY = `*[_type == "artwork" && slug.current == $slug][0]`;
    const post = await client.fetch(POST_QUERY, { slug });

    if (!post) {
      notFound();
    }
    console.log(post);
    return (
      <main className="container mx-auto p-8">
        <Link href="/shop" className="hover:underline mb-8 block">
          ← Back to all artwork
        </Link>

        <article className=" max-w-none grid md:grid-cols-2 md:gap-10 gap-0">
          <div className="space-y-2">
            <XlTitle content={post.title} className="text-start lg:text-5xl" />

            {post.image && (
              <div className="h-[60%]">
                <img
                  src={urlFor(post.image).width().url()}
                  alt={post.title}
                  className="object-cover w-full max-h-full rounded-lg"
                />
              </div>
            )}
          </div>

          <div>
            <div className="grid gap-1">
              {post.description.split(".").map((p, index) => (
                <p key={index}>{p}.</p>
              ))}
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
                        href={`/shop?edition=${encodeURIComponent(edition)}`}
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

                <p>{!post.price ? "free" : post.price.toFixed(2) + " dt"}</p>
              </div>
            </div>

            {post.tags?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/shop?tag=${encodeURIComponent(tag)}`}
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

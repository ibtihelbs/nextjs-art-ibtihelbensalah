import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import Link from "next/link";
import { notFound } from "next/navigation";

const { projectId, dataset } = client.config();
const builder = imageUrlBuilder({ projectId, dataset });
const urlFor = (source) => (source ? builder.image(source) : null);

// Add a helper function to get file URLs
const getFileUrl = (file) => {
  if (!file || !file.asset || !file.asset._ref) {
    return null;
  }
  // Convert the Sanity file reference to a downloadable URL
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${file.asset._ref
    .replace("file-", "")
    .replace("-", ".")}`;
};

export default async function PostPage({ params }) {
  try {
    const { slug } = params;
    console.log("Fetching artwork with slug:", slug);

    // Query for the specific artwork by slug
    const POST_QUERY = `*[_type == "artwork" && slug.current == $slug][0]`;
    const post = await client.fetch(POST_QUERY, { slug });

    if (!post) {
      console.log("No artwork found with slug:", slug);
      notFound();
    }

    return (
      <main className="container mx-auto min-h-screen max-w-7xl p-8">
        <Link href="/shop" className="hover:underline mb-8 block">
          ← Back to all artwork
        </Link>

        <article className="prose md:max-h-screen lg:prose-xl max-w-none grid md:grid-cols-2 md:gap-10">
          <div>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

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
            {post.description && (
              <div className="mb-6">
                <p className="text-lg">{post.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-6">
              {post.category && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Category
                  </h3>
                  <p>{post.category}</p>
                </div>
              )}

              {post.medium && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Medium</h3>
                  <p>{post.medium}</p>
                </div>
              )}

              {post.editions && post.editions.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Editions
                  </h3>
                  <p>{post.editions.join(", ")}</p>
                </div>
              )}

              {post.price && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Price</h3>
                  <p>
                    $
                    {post.price.toFixed(2) == 0
                      ? "free"
                      : post.price.toFixed(2)}
                  </p>
                </div>
              )}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-white px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {post.files && post.files.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Printable Files</h3>
                <ul className="list-disc pl-5">
                  {post.files.map((file, index) => (
                    <li key={index}>
                      <a
                        href={getFileUrl(file)}
                        download={file.originalFilename || `File-${index + 1}`}
                        className="text-blue-600 hover:underline"
                      >
                        Download {file.originalFilename || `File ${index + 1}`}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {post.digitalFiles && post.digitalFiles.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Digital Files</h3>
                <ul className=" pl-5">
                  {post.digitalFiles.map((file, index) => (
                    <li key={index}>
                      <a
                        href={getFileUrl(file)}
                        download={file.originalFilename || `File-${index + 1}`}
                        className="bg-blue-600 text-white hover:underline"
                      >
                        Download {file.originalFilename || `File ${index + 1}`}
                      </a>
                    </li>
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

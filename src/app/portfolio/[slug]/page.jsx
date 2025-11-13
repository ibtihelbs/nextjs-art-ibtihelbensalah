import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/imageUrl";
import { XlTitle } from "@/app/components/Text";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

export async function generateStaticParams() {
  const projects = await client.fetch(`*[_type == "portfolio"]{ slug }`);
  return projects.map((project) => ({
    slug: project.slug.current,
  }));
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;

  const PROJECT_QUERY = `*[_type == "portfolio" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
    projectType,
    technologies,
    content,
    image,
    extraImages,
    publishedAt
  }`;

  const project = await client.fetch(
    PROJECT_QUERY,
    { slug },
    { next: { revalidate: 30 } }
  );

  if (!project) {
    notFound();
  }

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

  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      <Link
        href="/portfolio"
        className="text-blue-600 hover:underline inline-block mb-6"
      >
        ← back to portfolio
      </Link>

      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <Link
              href={`/portfolio?projectType=${project.projectType}`}
              className="hover:text-black transition-colors"
            >
              {project.projectType}
            </Link>
            <span>•</span>
            <time dateTime={project.publishedAt}>
              {new Date(project.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <XlTitle
            content={project.title}
            className="text-4xl lg:text-6xl mb-4"
          />

          {project.description && (
            <p className="text-xl text-gray-600 leading-relaxed">
              {project.description}
            </p>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {project.technologies.map((tech, idx) => (
                <Link
                  key={idx}
                  href={`/portfolio?technologies=${tech}`}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  {tech}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Main Image */}
        {project.image?.asset?._ref && (
          <div className="relative w-full h-[400px] md:h-[600px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={urlFor(project.image).width(1200).height(800).url()}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        )}

        {/* Content */}
        {project.content && (
          <div className="prose prose-lg max-w-none mb-12">
            <PortableText value={project.content} components={components} />
          </div>
        )}

        {/* Extra Images Gallery */}
        {project.extraImages && project.extraImages.length > 0 && (
          <section className="mt-12">
            <h2 className="text-3xl font-bold mb-6">Project Gallery</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {project.extraImages
                .filter((image) => image?.asset?._ref) // Only include valid images
                .map((image, idx) => (
                  <div
                    key={idx}
                    className="relative h-80 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={urlFor(image).width(800).height(600).url()}
                      alt={`${project.title} - Image ${idx + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}

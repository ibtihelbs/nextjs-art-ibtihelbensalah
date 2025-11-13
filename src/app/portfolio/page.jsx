import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/imageUrl";
import { XlTitle } from "../components/Text";

export default async function PortfolioPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const [key, value] = Object.entries(resolvedParams || {})[0] || [];

  const buildQuery = () => {
    const baseQuery = `*[_type == "portfolio"]{
      _id,
      title,
      slug,
      description,
      projectType,
      technologies,
      image,
      publishedAt
    }|order(publishedAt desc)`;

    if (!key || !value) {
      return baseQuery;
    }

    // Array fields use 'in', string fields use 'match'
    const arrayFields = ["technologies"];
    const isArrayField = arrayFields.includes(key);
    const filterCondition = isArrayField
      ? `"${value}" in ${key}`
      : `${key} match "*${value}*"`;

    return `*[
      _type == "portfolio"
      && defined(slug.current)
      && ${filterCondition}
    ]{
      _id,
      title,
      slug,
      description,
      projectType,
      technologies,
      image,
      publishedAt
    }|order(publishedAt desc)`;
  };

  const projects = await client.fetch(
    buildQuery(),
    {},
    { next: { revalidate: 30 } }
  );

  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      {value && (
        <Link
          href="/portfolio"
          className="text-blue-600 hover:underline inline-block mb-4"
        >
          ← back to portfolio
        </Link>
      )}

      <XlTitle content={value || "portfolio"} className="lg:text-6xl py-4" />

      {!projects || projects.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No projects found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article
              key={project._id}
              className="group border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {project.image?.asset?._ref && (
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={urlFor(project.image).width(800).height(600).url()}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}

              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <Link
                    href={`/portfolio?projectType=${project.projectType}`}
                    className="hover:text-black transition-colors"
                  >
                    {project.projectType}
                  </Link>
                  <time dateTime={project.publishedAt}>
                    {new Date(project.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
                  </time>
                </div>

                <h2 className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h2>

                {project.description && (
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {project.description}
                  </p>
                )}

                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <Link
                        key={idx}
                        href={`/portfolio?technologies=${tech}`}
                        className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        {tech}
                      </Link>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs px-2 py-1 text-gray-500">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                <Link
                  href={`/portfolio/${project.slug.current}`}
                  className="inline-block mt-2 px-4 py-2 text-sm font-semibold border border-black rounded-full hover:bg-black hover:text-white transition-colors"
                >
                  View Project
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

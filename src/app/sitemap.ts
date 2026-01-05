import { MetadataRoute } from "next";
import { client } from "@/sanity/client"; // Adjust path to your Sanity client

type ContentItem = {
  slug: string;
  _updatedAt: string;
  publishedAt?: string;
};

async function getBlogPosts(): Promise<ContentItem[]> {
  const query = `*[_type == "blog"] {
    "slug": slug.current,
    _updatedAt,
    publishedAt
  }`;

  return await client.fetch(query);
}

async function getArtworks(): Promise<ContentItem[]> {
  const query = `*[_type == "artwork" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt,
    _createdAt
  }`;

  return await client.fetch(query);
}

async function getPortfolioProjects(): Promise<ContentItem[]> {
  const query = `*[_type == "portfolio"] {
    "slug": slug.current,
    _updatedAt,
    publishedAt
  }`;

  return await client.fetch(query);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ibtihelbensalah-art.vercel.app";
  const now = new Date();

  // Fetch all content from Sanity
  const [blogPosts, artworks, portfolioProjects] = await Promise.all([
    getBlogPosts(),
    getArtworks(),
    getPortfolioProjects(),
  ]);

  return [
    // Static pages
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },

    // Blog posts - use actual Sanity update dates
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt || post._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    // Artworks (shop) - use actual Sanity update dates
    ...artworks.map((artwork) => ({
      url: `${baseUrl}/shop/${artwork.slug}`,
      lastModified: new Date(artwork._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),

    // Portfolio projects - use actual Sanity update dates
    ...portfolioProjects.map((project) => ({
      url: `${baseUrl}/portfolio/${project.slug}`,
      lastModified: new Date(project.publishedAt || project._updatedAt),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}

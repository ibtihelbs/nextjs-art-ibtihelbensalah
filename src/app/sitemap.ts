import { MetadataRoute } from "next";

async function getBlogSlugs(): Promise<string[]> {
  return ["post-one", "post-two"];
}

async function getShopSlugs(): Promise<string[]> {
  return ["product-one", "product-two"];
}

async function getPortfolioSlugs(): Promise<string[]> {
  return ["project-one", "project-two"];
}
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  type SitemapItem = {
    url: string;
    lastModified?: string | Date | undefined;
    changeFrequency?:
      | "weekly"
      | "always"
      | "hourly"
      | "daily"
      | "monthly"
      | "yearly"
      | "never"
      | undefined;
    priority?: number | undefined;
  };
  const baseUrl = "https://nextjs-art-ibtihelbensalah.vercel.app";
  const now = new Date();

  const blogSlugs = await getBlogSlugs();
  const shopSlugs = await getShopSlugs();
  const portfolioSlugs = await getPortfolioSlugs();

  return [
    // Static pages
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // Blog posts
    ...blogSlugs.map<SitemapItem>((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })),

    // Shop products
    ...shopSlugs.map<SitemapItem>((slug) => ({
      url: `${baseUrl}/shop/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    })),

    // Portfolio projects
    ...portfolioSlugs.map<SitemapItem>((slug) => ({
      url: `${baseUrl}/portfolio/${slug}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    })),
  ];
}

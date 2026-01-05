import { MetadataRoute } from "next";

async function getBlogSlugs(): Promise<string[]> {
  return [
    "mon-calendrier-tunisien-2026-12-peintures-gouache-12-mois-de-voyage",
    "colors-of-tunisia-exhibiting-watercolors-in-the-historic-medina",
  ];
}

async function getShopSlugs(): Promise<string[]> {
  return [
    "tranquillity-peinture-acrylique-sur-toile",
    "echoes-of-tunis-tableau-peinture-acrylic-80x60-cm",
    "tunisian-courtyard-with-horseshoe-arches",
    "beyon-blue-doors-dar-annebi-tunis-carthage",
  ];
}

async function getPortfolioSlugs(): Promise<string[]> {
  return ["dessert-and-coffee-collection-2021"];
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
  const baseUrl = "https://ibtihelbensalah-art.vercel.app";
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

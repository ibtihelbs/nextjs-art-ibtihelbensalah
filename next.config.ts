const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        // No need for port or search parameters
      },
      // Add any other domains you use
      {
        protocol: "https",
        hostname: "**.sanity.io", // Wildcard for all sanity subdomains
      },
    ],
    // Optional: You can also set image optimization settings
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async rewrites() {
    return [
      {
        source: "/download/:file*",
        destination: "/api/download/:file*",
      },
    ];
  },
};

export default nextConfig;

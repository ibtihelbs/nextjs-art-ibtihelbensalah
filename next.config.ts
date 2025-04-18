
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        search: "",
      },
    ],
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

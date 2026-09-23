import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap-articles-:page.xml',
        destination: '/api/sitemaps/articles?page=:page',
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["mongodb", "bcryptjs"],
  async redirects() {
    return [
      { source: "/seo", destination: "/services/seo", permanent: false },
      { source: "/performance", destination: "/services/performance", permanent: false },
      { source: "/social", destination: "/services/social", permanent: false },
      { source: "/affiliate", destination: "/services/affiliate", permanent: false },
      { source: "/brand", destination: "/services/brand", permanent: false },
      { source: "/influencer", destination: "/services/influencer", permanent: false },
      { source: "/content", destination: "/services/content", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;

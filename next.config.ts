/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/blog/en",
        destination: "/en/blog",
        permanent: true,
      },
      {
        source: "/blog/pt-br",
        destination: "/pt-br/blog",
        permanent: true,
      },
      {
        source: "/blog/en/:slug",
        destination: "/en/blog/:slug",
        permanent: true,
      },
      {
        source: "/blog/pt-br/:slug",
        destination: "/pt-br/blog/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

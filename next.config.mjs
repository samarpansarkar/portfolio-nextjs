/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "skillicons.dev",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/samarpan/admin/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

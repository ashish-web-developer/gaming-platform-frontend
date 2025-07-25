/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  // edited
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/storage/**",
      },
      /** testing */
      // {
      //   protocol: "http",
      //   hostname: "192.168.204.216",
      //   port: "8000",
      //   pathname: "/storage/**",
      // },
    ],
  },
};

module.exports = nextConfig;

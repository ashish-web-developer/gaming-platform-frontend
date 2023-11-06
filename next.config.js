/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler:{
    styledComponents:true
  },
  // edited
  eslint:{
    ignoreDuringBuilds:true
  }
}

module.exports = nextConfig

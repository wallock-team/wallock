/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: process.env.API_URL,
    WEB_URL: process.env.WEB_URL,
  },
};

module.exports = nextConfig;

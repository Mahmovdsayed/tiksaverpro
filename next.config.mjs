/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: false,
    swcMinify: true,
    env: {
        API_URL: process.env.API_URL,
      },
};

export default nextConfig;

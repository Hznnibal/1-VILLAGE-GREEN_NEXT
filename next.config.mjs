/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [{ hostname: "images.unsplash.com", protocol: "https" }],
      },
      env: {
        DATABASE_URL: process.env.DATABASE_URL,
      },  
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wwaxeaycsqvbzzmodmpx.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/cabinImages/**',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com', // For Google user avatars
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;

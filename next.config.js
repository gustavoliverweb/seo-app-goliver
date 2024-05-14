/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v2jutiidzalmp6iu.public.blob.vercel-storage.com",
        port: "",
      },
    ],
    domains: ["res.cloudinary.com"],
  },
  experimental: {
    // …
    serverComponentsExternalPackages: ["@react-pdf/renderer"],
    missingSuspenseWithCSRBailout: false,
  },
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dxjuhqvt6",
    NEXT_PUBLIC_CLOUDINARY_PRESET_NAME: "im5rh9qa",
  },
};

module.exports = nextConfig;

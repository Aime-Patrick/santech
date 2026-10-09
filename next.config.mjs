/** @type {import('next').NextConfig} */

const strapiUrl = new URL(
  process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337'
);

const nextConfig = {
  // Standalone output bundles everything needed to run the app
  // without node_modules — required for cPanel Node.js App deployment
  output: 'standalone',

  // The cPanel host has an older GLIBC version and cannot run Next's native
  // SWC binary reliably. Keep static generation within one worker when Next
  // falls back to its WASM bindings.
  experimental: {
    cpus: 1,
    staticGenerationMaxConcurrency: 1,
    workerThreads: false,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: strapiUrl.protocol.replace(':', ''),
        hostname: strapiUrl.hostname,
        port: strapiUrl.port || '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '**'}/**`,
      },
    ],
  },
};

export default nextConfig;

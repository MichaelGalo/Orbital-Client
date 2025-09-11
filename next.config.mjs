/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
        'apod.nasa.gov',
        'thespacedevs-prod.nyc3.digitaloceanspaces.com'
    ]
  }
};

export default nextConfig;

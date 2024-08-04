
export default async (phase, { defaultConfig }) => {
    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
        images: {
            remotePatterns: [
              {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
              },
            ],
          },
    }
    return nextConfig
  }
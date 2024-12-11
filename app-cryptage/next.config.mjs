/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(mp3)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name][ext]',
        }
      });
      return config;
    },
    images: {
      remotePatterns: [],
    }
  };
  
  export default nextConfig;
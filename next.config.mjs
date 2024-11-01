/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async redirects() {
      return [
        {
          source: '/',
          destination: '/login',
          permanent: true,
        },
      ];
    },
  };
  
  export default nextConfig;
  
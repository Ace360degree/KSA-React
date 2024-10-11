/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https', // Assuming your image uses HTTPS
          hostname: 'admin.kuwalsanamarchitekts.com',
          port: '', // No port specified in the error message
        },
      ],
    },

  };
  
  export default nextConfig;
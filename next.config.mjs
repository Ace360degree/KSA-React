/** @type {import('next').NextConfig} */
const nextConfig = {
    "extends": "next",
    "rules": {
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off"
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https', // Assuming your image uses HTTPS
          hostname: '360clients.in',
          port: '', // No port specified in the error message
        },
      ],
    },

  };
  
  export default nextConfig;
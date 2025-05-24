/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // For local dev (user images)
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/img/users/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/img/tours/**",
      },

      // For production (Render hosted API)
      {
        protocol: "https",
        hostname: "natours-5myg.onrender.com",
        pathname: "/img/users/**",
      },
      {
        protocol: "https",
        hostname: "natours-5myg.onrender.com",
        pathname: "/img/tours/**",
      },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // TAMBAHKAN BARIS INI
  images: {
    unoptimized: true, // WAJIB untuk static export
  },
};

export default nextConfig;
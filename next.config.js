/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    IS_DEV_MODE: process.env.IS_DEV_MODE === 'true' ? 'true' : 'false',
  },
};

module.exports = nextConfig;

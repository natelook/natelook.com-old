// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    COINMARKETCAP_API_KEY: process.env.COINMARKETCAP_API_KEY,
  },
  images: {
    domains: ["s2.coinmarketcap.com"],
  },
};

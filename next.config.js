// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    COINMARKETCAP_API_KEY: process.env.COINMARKETCAP_API_KEY,
    NODE_ENV: process.env.NODE_END,
  },
  images: {
    domains: ["s2.coinmarketcap.com", "assets.coingecko.com"],
  },
};

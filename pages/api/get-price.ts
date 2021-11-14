import { NextApiRequest, NextApiResponse } from "next";
import CoinGeckoClient from "@lib/coingecko";
import Cors from "cors";

interface CoinProps {
  id: string;
  symbol: string;
  name: string;
  market_data: any;
}

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET"],
  origin: "*",
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const GetPrice = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors);
  const { symbols } = req.query;

  // try {
  //   console.log("hello99");
  //   const data = await CoinGeckoClient.coins.list({
  //     include_platform: true,
  //   });
  //   console.log(data);
  //   console.log("hello");
  //   return res.status(200).json({ data });
  // } catch (error) {
  //   console.log("error");
  //   console.log({ error });
  //   return res.status(400).json({ error });
  // }

  if (!symbols) return res.status(400).json({ error: "Must send a request" });

  const { data: coinList } = await CoinGeckoClient.coins.list({
    include_platform: true,
  });

  const symbolsArr = Array.isArray(symbols)
    ? symbols[0].split(",")
    : symbols.split(",");

  const allTokens = [];

  for (let i = 0; i < symbolsArr.length; i++) {
    const { id: tokenId } = coinList.find(
      (coin: CoinProps) => coin.symbol == symbolsArr[i]
    );

    if (!tokenId) return res.status(404).json({ error: "Token not found." });

    const { data: tokenInfo } = await CoinGeckoClient.coins.fetch(tokenId);

    const token = {
      id: tokenInfo.id,
      symbol: tokenInfo.symbol,
      name: tokenInfo.name,
      description: tokenInfo.description.en,
      image: tokenInfo.image.large,
      price: tokenInfo.market_data.current_price.usd,
      changePrice: tokenInfo.market_data.price_change_24h,
      changePercentage: tokenInfo.market_data.price_change_percentage_24h,
    };

    allTokens.push(token);
  }

  return res.status(200).json(allTokens);
};

export default GetPrice;

export const config = {
  methods: ["GET"],
  origin: "*",
};

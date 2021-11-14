import { NextApiRequest, NextApiResponse } from "next";
import CoinGeckoClient from "@lib/coingecko";

interface CoinProps {
  id: string;
  symbol: string;
  name: string;
  market_data: any;
}

const GetPrice = async (req: NextApiRequest, res: NextApiResponse) => {
  const { symbols } = req.query;

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
};

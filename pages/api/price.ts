import { NextApiRequest, NextApiResponse } from "next";
import CoinGeckoClient from "@lib/coingecko";

interface CoinProps {
  id: string;
  symbol: string;
  name: string;
  market_data: any;
}

const Price = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data: coinList } = await CoinGeckoClient.coins.list({
    include_platform: true,
  });

  const { id: tokenId } = coinList.find(
    (coin: CoinProps) => coin.symbol == "ens"
  );

  if (!tokenId) return res.status(404).json({ error: "Token not found." });

  const { data: tokenInfo } = await CoinGeckoClient.coins.fetch(tokenId);

  const token = {
    id: tokenInfo.name,
    symbol: tokenInfo.symbol,
    name: tokenInfo.name,
    description: tokenInfo.description.en,
    image: tokenInfo.image.large,
    price: tokenInfo.market_data.current_price.usd,
    changePrice: tokenInfo.market_data.price_change_24h,
    changePercentage: tokenInfo.market_data.price_change_percentage_24h,
  };

  return res.status(200).json(tokenInfo);
};

export default Price;

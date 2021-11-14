import CoinGeckoClient from "./coingecko";

interface CoinProps {
  id: string;
  symbol: string;
  name: string;
  market_data: any;
}

async function getWatchlist(symbols: string[]) {
  const { data: coinList } = await CoinGeckoClient.coins.list();

  const allTokens = [];

  for (let i = 0; i < symbols.length; i++) {
    const { id: tokenId } = coinList.find(
      (coin: CoinProps) => coin.symbol == symbols[i]
    );

    if (!tokenId) return;

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

  return allTokens;
}

export default getWatchlist;

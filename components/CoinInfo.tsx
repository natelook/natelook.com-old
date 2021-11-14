import Image from "next/image";
import classnames from "classnames";
import classNames from "classnames";

interface TokenProps {
  name: string;
  image: string;
  symbol: string;
  price: string;
  changePrice: number;
  changePercentage: number;
}

interface Props {
  coin: TokenProps;
}

export default function CoinInfo({ coin }: Props) {
  return (
    <div className="flex space-x-3 bg-white shadow-lg p-4 border rounded transform hover:scale-105 transition-transform duration-150">
      <div className="flex items-center">
        <Image
          src={coin.image}
          height="35px"
          width="35px"
          alt={`${coin.name} logo`}
        />
      </div>
      <div>
        <h2 className="text-lg font-bold">{coin.name}</h2>
        <div className="flex space-x-3">
          <h3 className="text-gray-500 font-normal uppercase">{coin.symbol}</h3>

          <span className="font-bold">${coin.price}</span>
        </div>
        <div className="flex space-x-3 items-center">
          <span
            className={classNames({
              "text-gray-400": Math.sign(coin.changePercentage) == -1,
              "text-green-600": Math.sign(coin.changePercentage) !== -1,
            })}
          >
            {coin.changePercentage.toFixed(2)}%
          </span>
          <span
            className={classNames({
              "text-gray-400": Math.sign(coin.changePrice) == -1,
              "text-green-600": Math.sign(coin.changePrice) !== -1,
            })}
          >
            ${coin.changePrice.toFixed(4)}
          </span>
        </div>
      </div>
    </div>
  );
}

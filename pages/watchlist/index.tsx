import CoinInfo from "@components/CoinInfo";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import getWatchlist from "@lib/get-watchlist";
import axios from "axios";

const fetcher = async () => {
  return await getWatchlist([
    "eth",
    "ens",
    "xsushi",
    "ohm",
    "matic",
    "lrc",
    "link",
  ]);
};

export default function WatchListPage({ coins }) {
  const { data } = useQuery("watchlist", fetcher, {
    initialData: coins,
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
  });

  return (
    <div className="md:h-screen flex items-center justify-center mt-32 md:mt-0 mb-72 md:mb-0">
      <main>
        <h1 className="text-5xl font-bold uppercase mb-3">My Watchlist</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-3">
          {coins &&
            data.map((token, i) => (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.05 * i }}
                key={token.id}
              >
                <a href={`https://www.coingecko.com/en/coins/${token.id}`}>
                  <CoinInfo coin={token} />
                </a>
              </motion.div>
            ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await axios.get(
    "/api/get-price?symbols=eth,ens,xsushi,ohm,matic,lrc,link",
    {
      baseURL: "https://natelook.com",
    }
  );

  return { props: { coins: data }, revalidate: 30 };
}

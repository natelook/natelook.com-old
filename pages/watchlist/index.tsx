import CoinInfo from "@components/CoinInfo";
import axios from "axios";
import { useQuery } from "react-query";

const fetcher = async () => {
  const { data } = await axios.get(
    "/api/get-price?symbols=eth,ens,xsushi,cro,lrc,matic,ohm",
    {
      // Update BASEURL later
      baseURL:
        process.env.NODE_ENV !== "development"
          ? "https://natelook.com"
          : "http://localhost:3000",
    }
  );

  return data;
};

export default function WatchListPage({ coins }) {
  const { data } = useQuery("watchlist", fetcher, {
    initialData: coins,
    refetchInterval: 30000,
  });

  return (
    <div className="md:h-screen flex items-center justify-center mt-32 md:mt-0 mb-72 md:mb-0">
      <main>
        <h1 className="text-5xl font-bold uppercase mb-3">My Watchlist</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-3">
          {data.map((token) => (
            <a
              href={`https://www.coingecko.com/en/coins/${token.id}`}
              key={token.id}
            >
              <CoinInfo coin={token} />
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const coins = await fetcher();

  return { props: { coins } };
}

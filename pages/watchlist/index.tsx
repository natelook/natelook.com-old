import CoinInfo from "@components/CoinInfo";
import axios from "axios";

export default function WatchListPage({ data }) {
  return (
    <div className="md:h-screen flex items-center justify-center mt-32 md:mt-0 mb-96">
      <main>
        <h1 className="text-5xl font-bold uppercase mb-3">Watchlist</h1>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
          {data.map((token) => (
            <CoinInfo key={token.id} coin={token} />
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
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

  return { props: { data } };
}

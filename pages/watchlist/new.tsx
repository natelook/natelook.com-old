import useCheckMyWalletAddress from "@hooks/useCheckMyWalletAddress";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Image from "next/image";
import React from "react";

interface TokenData {
  status: {
    timestamp: Date;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
    notice: string | null;
  };
  data: {
    [key: string]: {
      id: number;
      name: string;
      symbol: string;
      category: string;
      description: string;
      slug: string;
      logo: string;
    };
  };
}

interface Props {
  tokenData: TokenData | null;
  address: string | null;
  error?: string;
}

export default function NewWatchListItem({ tokenData, address, error }: Props) {
  const { account } = useWeb3React();
  const isMe = useCheckMyWalletAddress(account);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      address: address ? address : null,
    },
  });
  const router = useRouter();

  const onSubmit = async ({ address }: { address: string }) => {
    if (!isMe) return;
    router.push(`/watchlist/new?address=${address}`);
  };

  const token = tokenData ? Object.values(tokenData.data)[0] : null;
  return (
    <div className="h-screen flex items-center justify-center">
      {isMe && (
        <main className="flex justify-center items-center flex-col">
          <div className="max-w-lg w-full p-12 border rounded shadow-md">
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-bold mb-2">
                {!token ? "New Watch List Item" : "Add to Smart Contract"}
              </h1>
              {!token ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label>
                      Token Address
                      <input
                        type="text"
                        {...register("address")}
                        placeholder="Token address..."
                      />
                    </label>
                  </div>
                  {error && (
                    <p className="text-xs uppercase text-red-500 mt-1">
                      Token not found, please try again
                    </p>
                  )}
                  <button type="submit" className="mt-3 bg-blue-600 text-white">
                    Add
                  </button>
                </form>
              ) : (
                <React.Fragment>
                  <div className="flex space-x-3">
                    <div className="flex items-center">
                      <Image
                        src={token.logo}
                        height="35px"
                        width="35px"
                        alt={`${token.name} logo`}
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">{token.name}</h2>
                      <div className="flex space-x-3">
                        <h3 className="text-gray-400 font-normal">
                          {token.symbol}
                        </h3>
                        <span>$0.00</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex space-x-3">
                      <button
                        className="bg-gray-400 text-white"
                        onClick={() => {
                          router.push("/watchlist/new");
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-blue-600 text-white"
                        onClick={() => alert("TODO. Add to smart contract")}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { address } = query;
  if (!address)
    return { props: { tokenData: null, address: address ? address : null } };

  try {
    const { data: tokenData } = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?address=${address}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY!,
        },
      }
    );
    return { props: { tokenData, address: address ? address : null } };
  } catch (error) {
    console.log({ error });
    return {
      props: { error: "Token not found", address: address ? address : null },
    };
  }
}

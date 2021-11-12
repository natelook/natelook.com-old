import { useState, useEffect } from "react";

const wallet = "0x72872412507379E9766E42C439Bf98cbFe718Ef1";

export default function useCheckMyWalletAddress(address?: string | null) {
  const [isMe, setIsMe] = useState(false);

  useEffect(() => {
    if (address === wallet) {
      setIsMe(true);
    }
  }, [address]);

  return isMe;
}

import Link from "next/link";
import Account from "@components/Account";
import useEagerConnect from "@hooks/useEagerConnect";
import { useRouter } from "next/router";

export default function Nav() {
  const triedToEagerConnect = useEagerConnect();
  const { pathname } = useRouter();

  return (
    <header className="sticky w-full top-0">
      <nav className="flex justify-between container">
        <Link href="/">
          <a>Nate Look</a>
        </Link>
        {pathname == "/watchlist/new" && (
          <Account triedToEagerConnect={triedToEagerConnect} />
        )}
      </nav>
    </header>
  );
}

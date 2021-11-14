import Link from "next/link";
import Account from "@components/Account";
import useEagerConnect from "@hooks/useEagerConnect";
import { useRouter } from "next/router";

const navLinks = [
  {
    name: "Work",
    slug: "/work",
  },
  {
    name: "Watchlist",
    slug: "/watchlist",
  },
  {
    name: "Notes",
    slug: "/notes",
  },
];

export default function Nav() {
  const triedToEagerConnect = useEagerConnect();
  const { pathname } = useRouter();

  return (
    <header className="fixed shadow-lg py-5 w-full top-0 z-30 bg-white">
      <nav className="flex justify-between container">
        <Link href="/">
          <a className="font-bold tracking-wider text-xl">NATE</a>
        </Link>
        <ul className="flex space-x-3 items-center">
          {navLinks.map((link) => (
            <li key={link.slug}>
              <Link href={link.slug}>
                <a className="hover:text-blue-600 transition-colors duration-150">
                  {link.name}
                </a>
              </Link>
            </li>
          ))}
          {pathname == "/watchlist/new" && (
            <li>
              <Account triedToEagerConnect={triedToEagerConnect} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

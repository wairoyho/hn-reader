import { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "" }: Props) => (
  <div>
    <Head>
      <title>{`${title} | hacker news reader`}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header className="sticky top-0 bg-orange-500 p-2 z-20">
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{" "}
        |{" "}
        <Link href="/newest">
          <a>Newest</a>
        </Link>{" "}
        |{" "}
        <Link href="/best">
          <a>Best</a>
        </Link>
      </nav>
    </header>
    {children}
    <footer className="bg-orange-900 p-1">
      <span className="text-gray-100">I'm here to stay (Footer)</span>
    </footer>
  </div>
);

export default Layout;

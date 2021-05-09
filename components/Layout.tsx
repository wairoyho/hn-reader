import { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

type LayoutProps = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "" }: LayoutProps) => {
  const router = useRouter();

  const isHomePage = router.route === "/";

  const handleBackButtonClick = () => {
    const isHeadOfHistory = window.history?.state?.idx === 0;
    if (isHeadOfHistory) {
      router.push("/");
    } else {
      router.back();
    }
  };

  return (
    <>
      <Head>
        <title>{`${title} | hacker news reader`}</title>
      </Head>
      <header
        role="banner"
        className={
          isHomePage
            ? "w-full bg-orange-500 px-4 py-2 z-20"
            : "sticky top-0 w-full bg-orange-500 px-4 py-2 z-20"
        }
      >
        <div className="flex justify-center items-center">
          <div className="flex w-12 min-w-min items-start">
            {isHomePage ? (
              <div className="bg-orange-500 prose-lg w-6 h-6 leading-6 text-center text-white border">
                H
              </div>
            ) : (
              <button onClick={handleBackButtonClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
                  <path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z" />
                </svg>
              </button>
            )}
          </div>
          <div className="flex-shrink flex-grow prose-lg">{title}</div>
        </div>
      </header>
      {isHomePage && (
        <nav className="sticky block top-0 bg-orange-500 px-4 py-2 z-20 prose-lg">
          <div className="w-full block">
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
          </div>
        </nav>
      )}
      <main>{children}</main>
      <footer className="bg-orange-900 p-1">
        <span className="text-gray-100">I'm here to stay (Footer)</span>
      </footer>
    </>
  );
};

export default Layout;

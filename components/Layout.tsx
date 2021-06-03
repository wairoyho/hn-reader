import styled from "@emotion/styled";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import useLocalStorage from "../hooks/useLocalStorage";

interface SearchProps {
  onBlur?: () => void;
  onFocus: () => void;
  setShouldShowSearchPanel: (...args: any[]) => void;
}
const Search = (props: SearchProps) => {
  const { onFocus, setShouldShowSearchPanel } = props;

  const router = useRouter();

  const initialInput = (router.query.q ?? "").toString();
  const [inputValue, setInputValue] = useState<string>(initialInput);

  const [searchHistory, setSearchHistories] = useLocalStorage<string[]>(
    "searchHistory",
    []
  );

  useEffect(() => {
    if (router.isReady) {
      setInputValue((router.query.q ?? "").toString());
    }
  }, [router.isReady]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSearchHistories(
      searchHistory.includes(inputValue)
        ? [inputValue].concat(
            searchHistory.filter((item: string) => item !== inputValue)
          )
        : [inputValue, ...searchHistory]
    );
    router.replace(`/search?q=${inputValue}`);
    const input = document.getElementById("search-input") as HTMLInputElement;
    input.blur();
    setShouldShowSearchPanel(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <input
        id="search-input"
        className="w-full rounded-full pl-4 text-black"
        placeholder="Search"
        value={inputValue}
        // onBlur={onBlur}
        onChange={handleChange}
        onFocus={onFocus}
      />
    </form>
  );
};

const TabIndicator = styled.div`
  width: 100%;
  height: 0.125rem;
  background-color: white;
  // TODO: tempfix
  margin-top: -1px;
  margin-bottom: -1px;
`;

const Tabs = (props: { children: ReactNode }) => {
  const { children } = props;

  return (
    <div className="w-full block flex justify-between" role="tablist">
      {children}
    </div>
  );
};

const Tab = (props: { route: string; children: ReactNode }) => {
  const { route, children } = props;

  const router = useRouter();
  const isMatchRoute = (route: string) => router.route === route;

  return (
    <div className="flex-1 text-center" role="tab">
      <Link href={route}>
        <a>
          <span className={isMatchRoute(route) ? "font-medium text-white" : ""}>
            {children}
          </span>
          {isMatchRoute(route) && <TabIndicator />}
        </a>
      </Link>
    </div>
  );
};

const BottomNavBar = () => {
  const router = useRouter();

  const isMatchRoute = (routes: string[]) => routes.includes(router.route);

  return (
    <>
      <div className="p-6"></div>
      <nav className="flex fixed justify-center bottom-0 h-12 bg-orange-500 w-full z-20">
        <div className="flex-1 self-center text-amber-300">
          <Link href="/">
            <a>
              <svg
                className={
                  isMatchRoute(["/", "/best", "/latest"])
                    ? "m-auto text-white"
                    : "m-auto"
                }
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9.5L12 4L21 9.5"
                  stroke="currentColor"
                  strokeWidth={
                    isMatchRoute(["/", "/best", "/latest"]) ? "2.5" : "1.5"
                  }
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 13V19.4C19 19.7314 18.7314 20 18.4 20H5.6C5.26863 20 5 19.7314 5 19.4V13"
                  stroke="currentColor"
                  strokeWidth={
                    isMatchRoute(["/", "/best", "/latest"]) ? "2.5" : "1.5"
                  }
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </Link>
        </div>
        <div className="flex-1 self-center text-amber-300">
          <Link href="/explore">
            <a>
              <svg
                className={
                  isMatchRoute(["/explore", "/search"])
                    ? "m-auto text-white"
                    : "m-auto"
                }
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 15.5L19 19"
                  stroke="currentColor"
                  strokeWidth={
                    isMatchRoute(["/explore", "/search"]) ? "2.5" : "1.5"
                  }
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z"
                  stroke="currentColor"
                  strokeWidth={
                    isMatchRoute(["/explore", "/search"]) ? "2.5" : "1.5"
                  }
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </Link>
        </div>
        <div className="flex-1 self-center text-amber-300">
          <Link href="/settings">
            <a>
              <svg
                className={
                  isMatchRoute(["/settings"]) ? "m-auto text-white" : "m-auto"
                }
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  stroke="currentColor"
                  strokeWidth={isMatchRoute(["/settings"]) ? "2.5" : "1.5"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.6224 10.3954L18.5247 7.7448L20 6L18 4L16.2647 5.48295L13.5578 4.36974L12.9353 2H10.981L10.3491 4.40113L7.70441 5.51596L6 4L4 6L5.45337 7.78885L4.3725 10.4463L2 11V13L4.40111 13.6555L5.51575 16.2997L4 18L6 20L7.79116 18.5403L10.397 19.6123L11 22H13L13.6045 19.6132L16.2551 18.5155C16.6969 18.8313 18 20 18 20L20 18L18.5159 16.2494L19.6139 13.598L21.9999 12.9772L22 11L19.6224 10.3954Z"
                  stroke="currentColor"
                  strokeWidth={isMatchRoute(["/settings"]) ? "2.5" : "1.5"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </Link>
        </div>
      </nav>
    </>
  );
};

const SearchPanel = () => {
  const [searchHistories, setSearchHistories] = useLocalStorage(
    "searchHistory",
    []
  );

  const handleDeleteSearchHistory = useCallback(
    (idx: number) => {
      setSearchHistories(searchHistories.filter((_, index) => index !== idx));
    },
    [searchHistories]
  );

  return (
    <div>
      <div role="listbox">
        <div className="p-4 font-bold border-b">Recent</div>
        <div>
          {searchHistories.map((searchHistory, idx) => (
            <div
              key={`search-history-${idx}`}
              className="p-2 px-4 prose-lg border-b flex justify-between items-center"
            >
              <Link
                key={`search-${searchHistory}-${idx}`}
                href={`/search?q=${searchHistory}`}
                passHref
              >
                <a className="flex-grow">
                  <span>{searchHistory}</span>
                </a>
              </Link>
              <div
                className="text-red-500"
                onClick={() => handleDeleteSearchHistory(idx)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 11V20.4C19 20.7314 18.7314 21 18.4 21H5.6C5.26863 21 5 20.7314 5 20.4V11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 17V11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 17V11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 7L16 7M3 7L8 7M8 7V3.6C8 3.26863 8.26863 3 8.6 3L15.4 3C15.7314 3 16 3.26863 16 3.6V7M8 7L16 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

type LayoutProps = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "" }: LayoutProps) => {
  const router = useRouter();

  const [shouldShowSearchPanel, setShouldShowSearchPanel] = useState(false);

  const shouldShowLogo = ["/", "/best", "/latest", "/explore"].includes(
    router.route
  );
  const shouldShowSearchInput = ["/explore", "/search"].includes(router.route);
  const shouldShowTabs = ["/", "/best", "/latest"].includes(router.route);

  const handleBackButtonClick = () => {
    if (shouldShowSearchPanel) {
      setShouldShowSearchPanel(false);
      return;
    }
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
          shouldShowTabs
            ? "w-full bg-orange-500 px-4 py-2 z-20"
            : "sticky top-0 w-full bg-orange-500 px-4 py-2 z-20"
        }
      >
        <div className="flex justify-center items-center">
          <div className="flex w-12 min-w-min items-start">
            {shouldShowLogo && !shouldShowSearchPanel ? (
              <div className="bg-orange-500 prose-lg w-6 h-6 leading-6 text-center text-white border">
                H
              </div>
            ) : (
              <button onClick={handleBackButtonClick}>
                <svg
                  className="text-white"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 6L9 12L15 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="flex-shrink flex-grow prose-lg text-white font-bold">
            {shouldShowSearchInput ? (
              <Search
                // onBlur={useCallback(() => setShouldShowSearchPanel(false), [])}
                onFocus={useCallback(() => setShouldShowSearchPanel(true), [])}
                setShouldShowSearchPanel={setShouldShowSearchPanel}
              />
            ) : (
              <>{title}</>
            )}
          </div>
        </div>
      </header>
      {shouldShowTabs && (
        <nav className="sticky block top-0 bg-orange-500 px-4 py-2 z-20 prose-lg">
          <Tabs>
            <Tab route="/">Top</Tab>
            <Tab route="/latest">Latest</Tab>
            <Tab route="/best">Best</Tab>
          </Tabs>
        </nav>
      )}
      <main>{shouldShowSearchPanel ? <SearchPanel /> : <>{children}</>}</main>
      <BottomNavBar />
    </>
  );
};

export default Layout;

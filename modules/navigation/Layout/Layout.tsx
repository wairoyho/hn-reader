import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";

import { Icon } from "../../../modules/icon";
import { SearchBar, SearchPanel } from "../../../modules/search";

import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "../../ui";

import { Logo } from "..";

import styles from "./Layout.module.scss";

interface LinkTabProps {
  href: string;
  [x: string]: any;
}

const LinkTab = (props: LinkTabProps) => {
  const { href, label } = props;

  const router = useRouter();

  const isMatchRoute = (routes: string[]) => routes.includes(router.route);

  return (
    <Link href={href} passHref>
      <Tab
        component="a"
        label={label}
        selected={isMatchRoute([href])}
        {...props}
      />
    </Link>
  );
};

type LayoutProps = {
  children?: React.ReactNode;
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

  const isMatchRoute = (routes: string[]) => routes.includes(router.route);

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
      <AppBar
        border
        position={shouldShowTabs ? "static" : "sticky"}
        role="banner"
      >
        <Toolbar>
          <div style={{ marginRight: "1rem" }}>
            {shouldShowLogo && !shouldShowSearchPanel ? (
              <Logo />
            ) : (
              <IconButton onClick={handleBackButtonClick} size="small">
                <Icon icon="back" />
              </IconButton>
            )}
          </div>
          {shouldShowSearchInput ? (
            <SearchBar
              // onBlur={useCallback(() => setShouldShowSearchPanel(false), [])}
              onFocus={useCallback(() => setShouldShowSearchPanel(true), [])}
              setShouldShowSearchPanel={setShouldShowSearchPanel}
            />
          ) : (
            <Typography component="h2" variant="h6">
              {title}
            </Typography>
          )}
        </Toolbar>
      </AppBar>

      {shouldShowTabs && (
        <AppBar position="sticky">
          <Tabs component="nav" role="tablist">
            <LinkTab label="Top" href="/" />
            <LinkTab label="Latest" href="/latest" />
            <LinkTab label="Best" href="/best" />
          </Tabs>
        </AppBar>
      )}

      <main>{shouldShowSearchPanel ? <SearchPanel /> : <>{children}</>}</main>
      <>
        <BottomNavigation className={styles.bottomNavigation}>
          <Link href="/">
            <BottomNavigationAction
              active={isMatchRoute(["/", "/best", "/latest"])}
              component="a"
              icon={
                <Icon
                  icon="home"
                  bold={isMatchRoute(["/", "/best", "/latest"])}
                />
              }
            />
          </Link>
          <Link href="/explore" passHref>
            <BottomNavigationAction
              active={isMatchRoute(["/explore", "/search"])}
              component="a"
              icon={
                <Icon
                  icon="search"
                  bold={isMatchRoute(["/explore", "/search"])}
                />
              }
            />
          </Link>
          <Link href="/settings">
            <BottomNavigationAction
              active={isMatchRoute(["/settings"])}
              component="a"
              icon={<Icon icon="settings" bold={isMatchRoute(["/settings"])} />}
            />
          </Link>
        </BottomNavigation>
        <BottomNavigation />
      </>
    </>
  );
};

export default Layout;

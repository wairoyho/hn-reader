import {
  createContext,
  useContextSelector,
  ContextSelector,
} from "@fluentui/react-context-selector";
import { ReactNode, useCallback, useState } from "react";

import { NewsItem } from "../interfaces";

interface NewsItemStoreContextValue {
  items: { [x: string]: NewsItem };
  setItem: (itemId: number, item: NewsItem) => void;
}

const NewsItemStoreContext = createContext<NewsItemStoreContextValue>({
  items: {},
  // @ts-ignore
  setItem: (id: number, item: NewsItem) => {},
});

const NewsItemStoreProvider = ({ children }: { children: ReactNode }) => {
  const [items, setState] = useState({});

  const setItem = useCallback(
    (itemId: number, item: NewsItem) =>
      setState((s) => ({ ...s, [itemId]: item })),
    [setState]
  );

  return (
    <NewsItemStoreContext.Provider
      value={{
        items,
        setItem,
      }}
    >
      {children}
    </NewsItemStoreContext.Provider>
  );
};

export const useNewsItemStore = <T,>(
  selector: ContextSelector<NewsItemStoreContextValue, T>
) => useContextSelector(NewsItemStoreContext, selector);

export default NewsItemStoreProvider;

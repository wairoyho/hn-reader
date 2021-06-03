import {
  createContext,
  useContextSelector,
  ContextSelector,
} from "@fluentui/react-context-selector";
import { ReactNode, useCallback, useState } from "react";

import { NewsItem } from "../interfaces";

interface NewsList {
  ids: number[];
  offset: number;
}

interface NewsItemStoreContextValue {
  lists: { [x: string]: NewsList };
  items: { [x: string]: NewsItem };
  setItem: (itemId: number, item: NewsItem) => void;
  setList: (key: number | string, ids: number[]) => void;
  setListOffset: (key: number | string, offset: number) => void;
}

const NewsItemStoreContext = createContext<NewsItemStoreContextValue>({
  lists: {},
  items: {},
  setItem: (_id: number, _item: NewsItem) => {},
  setList: (_key: number | string, _ids: number[]) => {},
  setListOffset: (_key: number | string, _offest: number) => {},
});

const NewsItemStoreProvider = ({ children }: { children: ReactNode }) => {
  const [lists, setListsState] = useState<{ [x: string]: NewsList }>({});
  const [items, setState] = useState({});

  const setList = useCallback(
    (key: number | string, ids: number[]) =>
      setListsState((s) => ({
        ...s,
        [key]: {
          ...s[key],
          ids,
          // offset: 0
        },
      })),
    [setListsState]
  );
  const setListOffset = useCallback(
    (key: number | string, offset: number) =>
      setListsState((s) => ({
        ...s,
        [key]: {
          ...s[key],
          offset,
        },
      })),
    [setListsState]
  );

  const setItem = useCallback(
    (itemId: number, item: NewsItem) =>
      setState((s) => ({ ...s, [itemId]: item })),
    [setState]
  );

  return (
    <NewsItemStoreContext.Provider
      value={{
        lists,
        items,
        setItem,
        setList,
        setListOffset,
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

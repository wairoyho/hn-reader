import {
  createContext,
  useContextSelector,
  ContextSelector,
} from "@fluentui/react-context-selector";
import { ReactNode, useCallback, useState } from "react";

import { NewsItem } from "../interfaces";

interface NewsItemStoreContextValue {
  top: {
    ids: number[];
    setIds: (ids: number[]) => void;
    offset: number;
    setOffset: (offset: number) => void;
  };
  items: { [x: string]: NewsItem };
  setItem: (itemId: number, item: NewsItem) => void;
}

const NewsItemStoreContext = createContext<NewsItemStoreContextValue>({
  top: {
    ids: [],
    // @ts-ignore: value is never read
    setIds: (ids: number[]) => {},
    offset: 0,
    // @ts-ignore: value is never reads
    setOffset: (offset: number) => {},
  },
  items: {},
  // @ts-ignore: value is never read
  setItem: (id: number, item: NewsItem) => {},
});

const NewsItemStoreProvider = ({ children }: { children: ReactNode }) => {
  const [topItemIdList, setTopItemIdListState] = useState<number[]>([]);
  const [topItemIdListOffset, setTopItemIdListOffsetState] = useState(0);
  const [items, setState] = useState({});

  const setTopItemIdList = useCallback(
    (ids: number[]) => setTopItemIdListState(ids),
    [setTopItemIdListState]
  );
  const setTopItemIdListOffset = useCallback(
    (offset: number) => setTopItemIdListOffsetState(offset),
    [setTopItemIdListOffsetState]
  );

  const setItem = useCallback(
    (itemId: number, item: NewsItem) =>
      setState((s) => ({ ...s, [itemId]: item })),
    [setState]
  );

  return (
    <NewsItemStoreContext.Provider
      value={{
        top: {
          ids: topItemIdList,
          setIds: setTopItemIdList,
          offset: topItemIdListOffset,
          setOffset: setTopItemIdListOffset,
        },
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

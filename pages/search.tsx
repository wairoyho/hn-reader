import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

import Layout from "../components/Layout";
import List from "../components/List";
import { useNewsItemStore } from "../components/NewsItemStore";
import StoryListItem from "../components/StoryListItem";
import useFetch from "../hooks/useFetch";
import { getSearchByDatePath } from "../services/search";

const LIST_KEY = "searchResult";
const LIST_DISPLAY_COUNT = 10;

const SearchPage = () => {
  const { query, isReady } = useRouter();

  const searchResultItemIdList = useNewsItemStore(
    (state) => state.lists.searchResult?.ids ?? []
  );
  const setRecentPopularItemIdList = useNewsItemStore((state) => state.setList);
  const displayStoryCount = useNewsItemStore(
    (state) => state.lists.searchResult?.offset ?? 0
  );
  const setDisplayStoryCount = useNewsItemStore((state) => state.setListOffset);

  const { data, isLoading, loadData } = useFetch(fetch);

  useEffect(() => {
    if (isReady) {
      if (displayStoryCount > 0) {
        setRecentPopularItemIdList(LIST_KEY, []);
        setDisplayStoryCount(LIST_KEY, 0);
      }
      if (Boolean(query.q)) {
        loadData(
          getSearchByDatePath({
            page: 0,
            keyword: (query.q ?? "").toString(),
            tags: ["story"],
          })
        );
      }
    }
  }, [isReady, query]);

  useEffect(() => {
    if (data) {
      const itemIds = (data?.hits ?? []).map((item: any) =>
        parseInt(item.objectID, 10)
      );
      setRecentPopularItemIdList(LIST_KEY, [
        ...searchResultItemIdList,
        ...itemIds,
      ]);
      setDisplayStoryCount(LIST_KEY, displayStoryCount + LIST_DISPLAY_COUNT);
    }
  }, [data]);

  const handleLoadMore = useCallback(() => {
    if (!isLoading) {
      const newDisplayCount = displayStoryCount + LIST_DISPLAY_COUNT;
      loadData(
        getSearchByDatePath({
          page: newDisplayCount / LIST_DISPLAY_COUNT,
          keyword: (query.q ?? "").toString(),
          tags: ["story"],
        })
      );
    }
  }, [displayStoryCount, isLoading]);

  return (
    <Layout title="Search">
      <List>
        <div className="p-4 sticky top-12 bg-yellow-50 z-10 border-b">
          <h2 className="font-black">Search Result</h2>
        </div>
        {searchResultItemIdList.map((storyId) => (
          <Link key={`search-${storyId}`} href={`/items/${storyId}`}>
            <a>
              <StoryListItem storyId={storyId} />
            </a>
          </Link>
        ))}
        <li className="flex p-2">
          <button
            className="m-auto bg-orange-500 rounded-lg p-2"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </li>
      </List>
    </Layout>
  );
};

export default SearchPage;

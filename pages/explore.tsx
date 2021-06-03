import Link from "next/link";
import { useCallback, useEffect } from "react";

import Layout from "../components/Layout";
import List from "../components/List";
import { useNewsItemStore } from "../components/NewsItemStore";
import StoryListItem from "../components/StoryListItem";
import useFetch from "../hooks/useFetch";
import { getRecentPopularStoryListInstance } from "../services/search";

const LIST_KEY = "recentPopular";
const LIST_DISPLAY_COUNT = 10;

const ExplorePage = () => {
  const recentPopularItemIdList = useNewsItemStore(
    (state) => state.lists.recentPopular?.ids ?? []
  );
  const setRecentPopularItemIdList = useNewsItemStore((state) => state.setList);
  const displayStoryCount = useNewsItemStore(
    (state) => state.lists.recentPopular?.offset ?? 0
  );
  const setDisplayStoryCount = useNewsItemStore((state) => state.setListOffset);

  const { data, isLoading, loadData } = useFetch(
    getRecentPopularStoryListInstance(displayStoryCount / LIST_DISPLAY_COUNT)
  );

  useEffect(() => {
    if (displayStoryCount === 0) {
      loadData(LIST_DISPLAY_COUNT);
    }
  }, []);

  useEffect(() => {
    if (data) {
      const itemIds = (data?.hits ?? []).map((item: any) =>
        parseInt(item.objectID, 10)
      );
      setRecentPopularItemIdList(LIST_KEY, [
        ...recentPopularItemIdList,
        ...itemIds,
      ]);
      setDisplayStoryCount(LIST_KEY, displayStoryCount + LIST_DISPLAY_COUNT);
    }
  }, [data]);

  const handleLoadMore = useCallback(() => {
    if (!isLoading) {
      const newDisplayCount = displayStoryCount + LIST_DISPLAY_COUNT;
      loadData(newDisplayCount / LIST_DISPLAY_COUNT);
    }
  }, [displayStoryCount, isLoading]);

  return (
    <Layout title="Explore">
      <List>
        <div className="p-4 sticky top-12 bg-yellow-50 z-10 border-b">
          <h2 className="font-black">Recently Popular Stories</h2>
        </div>
        {recentPopularItemIdList.slice(0, displayStoryCount).map((storyId) => (
          <Link key={`explore-${storyId}`} href={`/items/${storyId}`}>
            <a>
              <StoryListItem storyId={storyId} />
            </a>
          </Link>
        ))}
        {/* <li className="flex p-2 pl-4 border-b text-orange-500 font-bold">
          See More
        </li> */}
        <li className="flex p-2">
          <button
            className="m-auto bg-orange-500 rounded-lg p-2"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </li>
      </List>

      {/* <List>
        <div className="p-4 sticky top-12 bg-yellow-50 z-10 border-b">
          <h2 className="font-black">Recently Show HN</h2>
        </div>
        {showHnItemList.slice(0, displayStoryCount).map((storyId) => (
          <Link key={storyId} href={`/items/${storyId}`}>
            <a>
              <StoryListItem storyId={storyId} />
            </a>
          </Link>
        ))}
      </List> */}
    </Layout>
  );
};

export default ExplorePage;

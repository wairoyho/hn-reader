import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { useNewsItemStore } from "../components/NewsItemStore";
import Layout from "../components/Layout";
import List from "../components/List";
import StoryListItem from "../components/StoryListItem";
import { getStoryList } from "../services/api";

const DISPALY_DISPLAY_COUNT = 10;

const BestPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const bestItemIdList = useNewsItemStore(
    (state) => state.lists.best?.ids ?? []
  );
  const setBestItemIdList = useNewsItemStore((state) => state.setList);
  const displayStoryCount = useNewsItemStore(
    (state) => state.lists.best?.offset ?? 0
  );
  const setDisplayStoryCount = useNewsItemStore((state) => state.setListOffset);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const storyIds = await getStoryList("best");
      setBestItemIdList("best", storyIds);

      setIsLoading(false);
    };
    if (bestItemIdList.length === 0 && !isLoading) {
      fetchData();
    }
  }, [bestItemIdList, isLoading]);

  useEffect(() => {
    if (!Boolean(displayStoryCount)) {
      setDisplayStoryCount("best", displayStoryCount + DISPALY_DISPLAY_COUNT);
    }
  }, []);

  const handleLoadMore = useCallback(() => {
    setDisplayStoryCount("best", displayStoryCount + DISPALY_DISPLAY_COUNT);
  }, [displayStoryCount]);

  return (
    <Layout title="Home">
      <List>
        {bestItemIdList.slice(0, displayStoryCount).map((storyId) => (
          <Link key={storyId} href={`/items/${storyId}`}>
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

export default BestPage;

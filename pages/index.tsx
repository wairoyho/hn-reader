import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { useNewsItemStore } from "../components/NewsItemStore";
import Layout from "../components/Layout";
import List from "../components/List";
import StoryListItem from "../components/StoryListItem";
import { getStoryList } from "../services/api";

const DISPALY_DISPLAY_COUNT = 10;

const IndexPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const topItemIdList = useNewsItemStore((state) => state.lists.top?.ids ?? []);
  const setTopItemIdList = useNewsItemStore((state) => state.setList);
  const displayStoryCount = useNewsItemStore(
    (state) => state.lists.top?.offset ?? 0
  );
  const setDisplayStoryCount = useNewsItemStore((state) => state.setListOffset);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const storyIds = await getStoryList("top");
      setTopItemIdList("top", storyIds);

      setIsLoading(false);
    };
    if (topItemIdList.length === 0 && !isLoading) {
      fetchData();
    }
  }, [topItemIdList, isLoading]);

  useEffect(() => {
    if (!Boolean(displayStoryCount)) {
      setDisplayStoryCount("top", displayStoryCount + DISPALY_DISPLAY_COUNT);
    }
  }, []);

  const handleLoadMore = useCallback(() => {
    setDisplayStoryCount("top", displayStoryCount + DISPALY_DISPLAY_COUNT);
  }, [displayStoryCount]);

  return (
    <Layout title="Home">
      <List>
        {topItemIdList.slice(0, displayStoryCount).map((storyId) => (
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

export default IndexPage;

import Link from "next/link";
import { useCallback, useEffect } from "react";

import { useNewsItemStore } from "../components/NewsItemStore";
import Layout from "../components/Layout";
import List from "../components/List";
import StoryListItem from "../components/StoryListItem";
import { getStoryList } from "../services/api";

const DISPALY_DISPLAY_COUNT = 10;

const LatestPage = () => {
  const latestItemIdList = useNewsItemStore(
    (state) => state.lists.latest?.ids ?? []
  );
  const setBestItemIdList = useNewsItemStore((state) => state.setList);
  const displayStoryCount = useNewsItemStore(
    (state) => state.lists.latest?.offset ?? 0
  );
  const setDisplayStoryCount = useNewsItemStore((state) => state.setListOffset);

  useEffect(() => {
    const fetchData = async () => {
      const storyIds = await getStoryList("new");

      setBestItemIdList("latest", storyIds);
    };
    if (latestItemIdList.length === 0) {
      fetchData();
    }
  }, [latestItemIdList]);

  useEffect(() => {
    if (!Boolean(displayStoryCount)) {
      setDisplayStoryCount("latest", displayStoryCount + DISPALY_DISPLAY_COUNT);
    }
  }, []);

  const handleLoadMore = useCallback(() => {
    setDisplayStoryCount("latest", displayStoryCount + DISPALY_DISPLAY_COUNT);
  }, [displayStoryCount]);

  return (
    <Layout title="Home">
      <List>
        {latestItemIdList.slice(0, displayStoryCount).map((storyId) => (
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

export default LatestPage;
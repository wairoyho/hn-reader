import Link from "next/link";
import { useCallback, useEffect } from "react";

import { useNewsItemStore } from "../components/NewsItemStore";
import Layout from "../components/Layout";
import List from "../components/List";
import StoryListItem from "../components/StoryListItem";
import { getStoryList } from "../services/api";

const DISPALY_DISPLAY_COUNT = 10;

const IndexPage = () => {
  const topItemIdList = useNewsItemStore((state) => state.top.ids);
  const setTopItemIdList = useNewsItemStore((state) => state.top.setIds);
  const displayStoryCount = useNewsItemStore((state) => state.top.offset);
  const setDisplayStoryCount = useNewsItemStore((state) => state.top.setOffset);

  useEffect(() => {
    const fetchData = async () => {
      const storyIds = await getStoryList("top");

      setTopItemIdList(storyIds);
    };
    if (topItemIdList.length === 0) {
      fetchData();
    }
  }, [topItemIdList]);

  useEffect(() => {
    if (!Boolean(displayStoryCount)) {
      setDisplayStoryCount(displayStoryCount + DISPALY_DISPLAY_COUNT);
    }
  }, []);

  const handleLoadMore = useCallback(() => {
    setDisplayStoryCount(displayStoryCount + DISPALY_DISPLAY_COUNT);
  }, [displayStoryCount]);

  return (
    <Layout title="Home">
      <List>
        {topItemIdList.slice(0, displayStoryCount).map((storyId) => (
          <Link key={storyId} href={`/item/${storyId}`}>
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

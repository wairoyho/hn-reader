import { useCallback, useEffect, useState } from "react";

import { Layout } from "../modules/navigation";
import { StoryListItem, useNewsItemStore } from "../modules/news";
import { Button, List } from "../modules/ui";

import { getStoryList } from "../services/api";

const LIST_KEY = "best";
const DISPALY_DISPLAY_COUNT = 10;

const BestPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const bestItemIdList = useNewsItemStore(
    (state) => state.lists[LIST_KEY]?.ids ?? []
  );
  const setBestItemIdList = useNewsItemStore((state) => state.setList);
  const displayStoryCount = useNewsItemStore(
    (state) => state.lists[LIST_KEY]?.offset ?? 0
  );
  const setDisplayStoryCount = useNewsItemStore((state) => state.setListOffset);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const storyIds = await getStoryList(LIST_KEY);
      setBestItemIdList(LIST_KEY, storyIds);

      setIsLoading(false);
    };
    if (bestItemIdList.length === 0 && !isLoading) {
      fetchData();
    }
  }, [bestItemIdList, isLoading]);

  useEffect(() => {
    if (!Boolean(displayStoryCount)) {
      setDisplayStoryCount(LIST_KEY, displayStoryCount + DISPALY_DISPLAY_COUNT);
    }
  }, []);

  const handleLoadMore = useCallback(() => {
    setDisplayStoryCount(LIST_KEY, displayStoryCount + DISPALY_DISPLAY_COUNT);
  }, [displayStoryCount]);

  return (
    <Layout title="Home">
      <List>
        {bestItemIdList.slice(0, displayStoryCount).map((storyId) => (
          <StoryListItem
            key={`best-story-listitem-${storyId}`}
            storyId={storyId}
          />
        ))}
        <div
          style={{
            display: "flex",
            padding: "0.5rem",
            justifyContent: "center",
          }}
        >
          <Button onClick={handleLoadMore}>Load More</Button>
        </div>
      </List>
    </Layout>
  );
};

export default BestPage;

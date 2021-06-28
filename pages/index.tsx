import { useCallback, useEffect, useState } from "react";

import { Layout } from "../modules/navigation";
import { StoryListItem, useNewsItemStore } from "../modules/news";
import { Button, List } from "../modules/ui";

import { getStoryList } from "../services/api";

const LIST_KEY = "top";
const DISPALY_DISPLAY_COUNT = 10;

const IndexPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const topItemIdList = useNewsItemStore(
    (state) => state.lists[LIST_KEY]?.ids ?? []
  );
  const setTopItemIdList = useNewsItemStore((state) => state.setList);
  const displayStoryCount = useNewsItemStore(
    (state) => state.lists[LIST_KEY]?.offset ?? 0
  );
  const setDisplayStoryCount = useNewsItemStore((state) => state.setListOffset);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const storyIds = await getStoryList(LIST_KEY);
      setTopItemIdList(LIST_KEY, storyIds);

      setIsLoading(false);
    };
    if (topItemIdList.length === 0 && !isLoading) {
      fetchData();
    }
  }, [topItemIdList, isLoading]);

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
        {topItemIdList.slice(0, displayStoryCount).map((storyId) => (
          <StoryListItem
            key={`top-story-listitem-${storyId}`}
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

export default IndexPage;

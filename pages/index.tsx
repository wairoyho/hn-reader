import { useCallback, useEffect, useState } from "react";

import Layout from "../components/Layout";
import List from "../components/List";
import StoryListItem from "../components/StoryListItem";
import { getStoryList } from "../services/api";

const DISPALY_DISPLAY_COUNT = 10;

const IndexPage = () => {
  const [storyIdList, setStoryIdList] = useState([]);
  const [displayStoryCount, setDisplayStoryCount] = useState(
    DISPALY_DISPLAY_COUNT
  );

  useEffect(() => {
    const fetchData = async () => {
      const storyIds = await getStoryList("top");

      setStoryIdList(storyIds);
    };
    fetchData();
  }, []);

  const handleLoadMore = useCallback(() => {
    setDisplayStoryCount(displayStoryCount + DISPALY_DISPLAY_COUNT);
  }, [displayStoryCount]);

  return (
    <Layout title="Home">
      <List>
        {storyIdList.slice(0, displayStoryCount).map((storyId) => (
          <StoryListItem key={storyId} storyId={storyId} />
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

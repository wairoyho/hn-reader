import Link from "next/link";
import { useCallback, useEffect } from "react";

import useFetch from "../hooks/useFetch";

import { Layout } from "../modules/navigation";
import { StoryListItem, useNewsItemStore } from "../modules/news";
import { Button, List, ListSubheader, Typography } from "../modules/ui";

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
      <List
        subheader={
          <ListSubheader disableSticky={true}>
            <Typography
              component="h2"
              variant="subtitle1"
              color="textPrimary"
              style={{
                fontWeight: 700,
              }}
            >
              Recently Popular Stories
            </Typography>
          </ListSubheader>
        }
      >
        {recentPopularItemIdList.slice(0, displayStoryCount).map((storyId) => (
          <Link key={`explore-${storyId}`} href={`/items/${storyId}`}>
            <a>
              <StoryListItem storyId={storyId} />
            </a>
          </Link>
        ))}
        <div
          style={{
            display: "flex",
            padding: "0.5rem",
            justifyContent: "center",
          }}
        >
          <Button variant="text" onClick={handleLoadMore}>
            Load More
          </Button>
        </div>
      </List>
    </Layout>
  );
};

export default ExplorePage;

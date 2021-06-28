import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

import useFetch from "../hooks/useFetch";

import { Layout } from "../modules/navigation";
import { StoryListItem, useNewsItemStore } from "../modules/news";
import { Button, List, ListSubheader, Typography } from "../modules/ui";

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
              Search Result
            </Typography>
          </ListSubheader>
        }
      >
        {searchResultItemIdList.map((storyId) => (
          <StoryListItem key={`search-${storyId}`} storyId={storyId} />
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

export default SearchPage;

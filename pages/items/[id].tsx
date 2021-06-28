import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useCallback, useEffect, useState } from "react";

import { NewsItem } from "../../interfaces";

import { Layout } from "../../modules/navigation";
import {
  CommentListItem,
  NewsCard,
  useNewsItemStore,
} from "../../modules/news";
import { Button, List } from "../../modules/ui";

import { getItem } from "../../services/api";

const ThreadListItem = ({ children }: { children: React.ReactElement }) => (
  <div
    style={{
      padding: "1rem",
      paddingBottom: "0rem",
      borderBottomWidth: "1px",
    }}
  >
    {children}
  </div>
);

interface ItemPageProps {
  id: number;
  item: NewsItem;
}

const LOAD_MORE_COUNT = 10;

const ItemPage = (props: ItemPageProps) => {
  const { id, item } = props;

  const setItem = useNewsItemStore((state) => state.setItem);

  // @ts-ignore property kids doesn't exist
  const commentIdList = (item?.kids ?? []) as any[];
  const [listDisplayCount, setListDisplayCount] = useState(LOAD_MORE_COUNT);

  useEffect(() => {
    setItem(id, item);
  }, []);

  const handleLoadMore = useCallback(() => {
    setListDisplayCount(listDisplayCount + LOAD_MORE_COUNT);
  }, [listDisplayCount]);

  return (
    <Layout title="Thread">
      <NewsCard item={item} />
      <List>
        {commentIdList.slice(0, listDisplayCount).map((commentId) => (
          <ThreadListItem key={commentId}>
            <CommentListItem key={commentId} commentId={commentId} />
          </ThreadListItem>
        ))}
      </List>
      <div
        style={{
          display: "flex",
          padding: "0.5rem",
          justifyContent: "center",
        }}
      >
        <Button onClick={handleLoadMore}>Load More</Button>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const { id } = query;

  const itemId = parseInt((id ?? "").toString(), 10);
  let item = null;
  if (itemId) {
    item = await getItem(itemId);
  }

  return {
    props: {
      id: parseInt((id ?? "").toString(), 10),
      item,
    },
  };
};

export default ItemPage;

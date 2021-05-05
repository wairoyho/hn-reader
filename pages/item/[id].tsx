import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useCallback, useState } from "react";

import CommentListItem from "../../components/CommentListItem";
import Layout from "../../components/Layout";
import List from "../../components/List";
import NewsCard from "../../components/NewsCard";
import { StoryItem } from "../../interfaces";
import { getItem } from "../../services/api";

interface ItemPageProps {
  item: StoryItem;
}

const LOAD_MORE_COUNT = 10;

const ItemPage = (props: ItemPageProps) => {
  const { item } = props;

  const commentIdList = item?.kids ?? [];
  const [listDisplayCount, setListDisplayCount] = useState(LOAD_MORE_COUNT);

  const handleLoadMore = useCallback(() => {
    setListDisplayCount(listDisplayCount + LOAD_MORE_COUNT);
  }, [listDisplayCount]);

  return (
    <Layout title="Story">
      <NewsCard item={item} />
      <List component="div">
        {commentIdList.slice(0, listDisplayCount).map((commentId) => (
          <CommentListItem key={commentId} commentId={commentId} />
        ))}
      </List>
      <li className="flex p-2">
        <button
          className="m-auto bg-amber-400 rounded-lg p-2"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      </li>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const { id } = query;

  const itemId = parseInt((id ?? "").toString(), 10);
  let story;
  if (itemId) {
    story = await getItem(itemId);
  }

  return {
    props: {
      id: parseInt((id ?? "").toString(), 10),
      item: story,
    },
  };
};

export default ItemPage;

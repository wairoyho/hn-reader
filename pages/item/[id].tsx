import styled from "@emotion/styled";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useCallback, useState } from "react";

import CommentListItem from "../../components/CommentListItem";
import Layout from "../../components/Layout";
import NewsCard from "../../components/NewsCard";
import { NewsItem } from "../../interfaces";
import { getItem } from "../../services/api";

const ThreadListItem = styled.div`
  padding: 1rem;
  padding-bottom: 0rem;
  border-bottom-width: 1px;
`;

interface ItemPageProps {
  item: NewsItem;
}

const LOAD_MORE_COUNT = 10;

const ItemPage = (props: ItemPageProps) => {
  const { item } = props;

  // @ts-ignore property kids doesn't exist
  const commentIdList = (item?.kids ?? []) as any[];
  const [listDisplayCount, setListDisplayCount] = useState(LOAD_MORE_COUNT);

  const handleLoadMore = useCallback(() => {
    setListDisplayCount(listDisplayCount + LOAD_MORE_COUNT);
  }, [listDisplayCount]);

  return (
    <Layout title="Thread">
      <NewsCard item={item} />
      <div className="list-none m-0 p-0">
        {commentIdList.slice(0, listDisplayCount).map((commentId) => (
          <ThreadListItem key={commentId}>
            <CommentListItem key={commentId} commentId={commentId} />
          </ThreadListItem>
        ))}
      </div>
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

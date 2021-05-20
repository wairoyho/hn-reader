import styled from "@emotion/styled";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import HtmlContent from "../../components/HtmlContent";
import Layout from "../../components/Layout";
import NewsCard from "../../components/NewsCard";
import { UserItem, NewsItem } from "../../interfaces";
import { getUserProfile, getItem } from "../../services/api";

const Skeleton = () => (
  <div className="flex w-full space-x-4 animate-pulse">
    <div className="flex-1 space-y-4 py-1">
      <div className="h-4 bg-amber-100 rounded w-1/2" />
      <div className="space-y-2">
        <div className="h-5 bg-amber-100 rounded" />
        <div className="h-5 bg-amber-100 rounded" />
        <div className="h-5 bg-amber-100 rounded w-4/6" />
      </div>
    </div>
  </div>
);

const SubmittedItem = ({ id }: { id: number }) => {
  const [item, setItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      const item = await getItem(id);

      setItem(item);
    };
    fetchItem();
  }, [id]);

  if (!item) return <Skeleton />;

  return (
    <Link href={`/item/${id}`} passHref>
      <a>
        <NewsCard item={item} />
      </a>
    </Link>
  );
};

const SubmittedListItem = styled.div`
  padding: 1rem;
  padding-bottom: 0rem;
  border-bottom-width: 1px;
`;

interface UserPageProps {
  user: UserItem;
}

const LOAD_MORE_COUNT = 10;

const UserPage = (props: UserPageProps) => {
  const { user } = props;

  const [listDisplayCount, setListDisplayCount] = useState(LOAD_MORE_COUNT);

  const handleLoadMore = useCallback(() => {
    setListDisplayCount(listDisplayCount + LOAD_MORE_COUNT);
  }, [listDisplayCount]);

  return (
    <Layout title="User">
      <div className="p-4 border-b">
        <div>
          <span className="prose-lg font-bold">{user.id}</span>
        </div>
        <div className="pb-2">
          <span className="text-gray-500">@{user.id}</span>
        </div>
        {user.about && (
          <div className="pb-4">
            <span>
              <HtmlContent content={user.about} />
            </span>
          </div>
        )}
        <div className="pb-2">
          <span className="text-gray-500">Joined </span>
          <span className="text-gray-500">
            {new Date(user.created * 1000).toDateString()}
          </span>
        </div>
        <div>
          <span className="font-bold">{user.karma}</span>
          <span className="text-gray-500"> Karma</span>
        </div>
        <div>
          <span className="font-bold">{user.submitted.length}</span>
          <span className="text-gray-500"> Submissions</span>
        </div>
      </div>
      <div className="list-none m-0 p-0">
        {user.submitted.slice(0, listDisplayCount).map((itemId) => (
          <SubmittedListItem key={itemId}>
            <SubmittedItem id={itemId} />
          </SubmittedListItem>
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

  const userId = id?.toString();
  let user = null;
  if (userId) {
    user = await getUserProfile(userId);
  }

  return {
    props: {
      id: userId,
      user,
    },
  };
};

export default UserPage;

import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { UserItem, NewsItem } from "../../interfaces";

import { HtmlContent } from "../../modules/common";
import { Layout } from "../../modules/navigation";
import { NewsCard } from "../../modules/news";
import { Button, List, Typography } from "../../modules/ui";
import { Skeleton, SubmittedListItem } from "../../modules/user";

import { getUserProfile, getItem } from "../../services/api";

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
    <Link href={`/items/${id}`} passHref>
      <a>
        <NewsCard item={item} />
      </a>
    </Link>
  );
};

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
      <div style={{ padding: "1rem", borderBottomWidth: "1px" }}>
        <div>
          <Typography component="span" variant="h6" style={{ fontWeight: 700 }}>
            {user.id}
          </Typography>
        </div>
        <div style={{ paddingBottom: "0.5rem" }}>
          <Typography component="span" color="textSecondary">
            @{user.id}
          </Typography>
        </div>
        {user.about && (
          <div style={{ paddingBottom: "1rem" }}>
            <span>
              <HtmlContent content={user.about} />
            </span>
          </div>
        )}
        <div style={{ paddingBottom: "0.5rem" }}>
          <Typography component="span" color="textSecondary">
            Joined{" "}
          </Typography>
          <Typography component="span" color="textSecondary">
            {new Date(user.created * 1000).toDateString()}
          </Typography>
        </div>
        <div>
          <Typography
            component="span"
            color="textSecondary"
            style={{ fontWeight: 700 }}
          >
            {user.karma}
          </Typography>
          <Typography component="span" color="textSecondary">
            {" "}
            Karma
          </Typography>
        </div>
        <div>
          <Typography
            component="span"
            color="textSecondary"
            style={{ fontWeight: 700 }}
          >
            {user.submitted.length}
          </Typography>
          <Typography component="span" color="textSecondary">
            {" "}
            Submissions
          </Typography>
        </div>
      </div>
      <List>
        {user.submitted.slice(0, listDisplayCount).map((itemId) => (
          <SubmittedListItem key={itemId}>
            <SubmittedItem id={itemId} />
          </SubmittedListItem>
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

import Link from "next/link";
import { useEffect } from "react";

import { StoryItem } from "../../../interfaces";

import { geStoryItem } from "../../../services/api";
import { getRelativeTime } from "../../../utils/date";

import { Icon } from "../../../modules/icon";
import { Typography } from "../../../modules/ui";

import { StoryListItemSkeleton, useNewsItemStore } from "..";

import styles from "./StoryListItem.module.scss";

interface StoryListItemProps {
  component?: React.ElementType;
  storyId: number;
}

const getColorCode = (score: number) => {
  if (score < 100) return "#FDBA74";
  if (score < 300) return "#FB923C";
  if (score < 500) return "#F97316";
  if (score < 1000) return "#EA580C";
  return "#C2410C";
};

const StoryListItem = (props: StoryListItemProps) => {
  const { component = "li", storyId } = props;

  const story = useNewsItemStore((state) => state.items[storyId]) as StoryItem;
  const setItem = useNewsItemStore((state) => state.setItem);

  useEffect(() => {
    const fetchStory = async () => {
      const item = await geStoryItem(storyId);

      setItem(storyId, item);
    };

    if (!story) {
      fetchStory();
    }
  }, [story]);

  const Component = component;

  return (
    <Component className={styles.root}>
      {story ? (
        <article className={styles.card}>
          <Link href={`/items/${storyId}`}>
            <a className={styles.overlay} />
          </Link>

          <div className={styles.subHeader}>
            <div style={{ flexGrow: 1 }}>
              <Typography variant="body2">{`@${story.by}`}</Typography>
              <Typography
                color="textSecondary"
                style={{ marginLeft: "0.25rem", marginRight: "0.25rem" }}
              >
                ·
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {`${getRelativeTime(new Date(story.time * 1000))}`}
              </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                className={styles.subHeaderItem}
                style={{ marginRight: "1rem" }}
              >
                <span style={{ display: "inherit", marginRight: "0.5rem" }}>
                  <Icon icon="arrowUp" color={getColorCode(story.score)} />
                </span>
                <Typography
                  variant="body2"
                  align="center"
                  style={{ minWidth: 32 }}
                >
                  {`${story.score}`}
                </Typography>
              </div>
              <div className={styles.subHeaderItem}>
                <span
                  style={{
                    display: "inherit",
                    marginRight: "0.5rem",
                  }}
                >
                  <Icon icon="comment" width="18" height="18" />
                </span>
                <Typography
                  variant="body2"
                  align="center"
                  style={{ minWidth: 32 }}
                >
                  {`${(story?.kids ?? []).length}`}
                </Typography>
              </div>
            </div>
          </div>

          <div className={styles.content}>
            <Typography
              component="h2"
              color="textPrimary"
              variant="h6"
              style={{ fontWeight: 400, wordBreak: "word-break" }}
            >
              {story.title}
              {story.url && (
                <Typography
                  component="span"
                  color="textSecondary"
                  display="inline"
                  variant="body2"
                  style={{ marginLeft: "0.25rem" }}
                >
                  (
                  <Link href={story.url}>
                    <a target="_blank" className={styles.externalLinkAnchor}>
                      <Typography
                        display="inline"
                        variant="body2"
                        color="textSecondary"
                      >
                        {new URL(story.url).hostname}
                      </Typography>
                    </a>
                  </Link>
                  )
                </Typography>
              )}
            </Typography>
          </div>
        </article>
      ) : (
        <StoryListItemSkeleton />
      )}
    </Component>
  );
};

export default StoryListItem;

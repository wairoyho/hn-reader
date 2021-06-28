import Link from "next/link";
import { useEffect } from "react";

import { Avatar, HtmlContent } from "../../../modules/common";
import { Icon } from "../../../modules/icon";
import { Typography } from "../../../modules/ui";

import { CommentItem } from "../../../interfaces";
import { getCommentItem } from "../../../services/api";
import { getRelativeTime } from "../../../utils/date";

import { CommentListItemSkeleton, useNewsItemStore } from "..";

import styles from "./CommentListItem.module.scss";

interface CommentListItemProps {
  commentId: number;
  loadmoreItemCount?: number;
  depth?: number;
  showThreadLine?: boolean;
}

const CommentListItem = (props: CommentListItemProps) => {
  const { commentId, depth = 0, showThreadLine = false } = props;

  const comment = useNewsItemStore(
    (state) => state.items[commentId]
  ) as CommentItem;
  const setItem = useNewsItemStore((state) => state.setItem);

  useEffect(() => {
    const fetchComment = async () => {
      const item = await getCommentItem(commentId);

      setItem(commentId, item);
    };
    if (!comment) {
      fetchComment();
    }
  }, [comment]);

  const hasChildren = (comment?.kids ?? []).length > 0;
  const hasMoreThanOnceChildren = (comment?.kids ?? []).length > 1;

  if (comment?.deleted) {
    return (
      <div className={styles.deleted}>
        <Typography color="textSecondary">Deleted</Typography>
      </div>
    );
  }

  if (!Boolean(comment)) {
    return <CommentListItemSkeleton />;
  }

  if (comment) {
    return (
      <>
        <Link href={`/items/${comment.id}`}>
          <a>
            <article className={styles.flex}>
              <div className={styles.aside}>
                <div className={styles["flex-shrink"]}>
                  <Link href={`/users/${comment.by}`}>
                    <a>
                      <Avatar username={comment.by} />
                    </a>
                  </Link>
                </div>
                {((depth === 0 && hasChildren) || showThreadLine) && (
                  <div className={styles["thread-line"]} />
                )}
              </div>
              <div>
                <div className={styles.header}>
                  <div>
                    <Typography variant="body2" color="textSecondary">
                      @{comment.by}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body2" color="textSecondary">
                      {getRelativeTime(new Date(comment.time * 1000))}
                    </Typography>
                  </div>
                </div>
                <div>
                  <HtmlContent content={comment?.text} />
                </div>
                <div className={styles.content}>
                  <Icon icon="comment" />
                  <span>{(comment?.kids ?? []).length}</span>
                </div>
              </div>
            </article>
          </a>
        </Link>
        {hasChildren && depth === 0 && (
          <CommentListItem
            commentId={comment?.kids?.[0] ?? 0}
            depth={depth + 1}
            showThreadLine={hasMoreThanOnceChildren}
          />
        )}
        {hasMoreThanOnceChildren && depth === 0 && (
          <div className={styles.flex}>
            <div className={styles["thread-spread"]}>
              <div />
              <div />
              <div />
              <div />
            </div>

            <Link href={`/items/${comment.id}`} passHref>
              <Typography color="primary">Show this thread</Typography>
            </Link>
          </div>
        )}
      </>
    );
  }

  return null;
};

export default CommentListItem;

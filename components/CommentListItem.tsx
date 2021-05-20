import styled from "@emotion/styled";
import Link from "next/link";
import { useEffect, useState } from "react";

import Avatar from "../components/Avatar";
import HtmlContent from "../components/HtmlContent";
import { CommentIcon } from "../components/icons";
import { CommentItem } from "../interfaces";
import { getCommentItem } from "../services/api";
import { getRelativeTime } from "../utils/date";

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

const StyledAnchor = styled.a`
  color: rgba(249, 115, 22, var(--tw-bg-opacity));
`;

interface CommentListItemProps {
  commentId: number;
  loadmoreItemCount?: number;
  depth?: number;
  showThreadLine?: boolean;
}

const CommentListItem = (props: CommentListItemProps) => {
  const { commentId, depth = 0, showThreadLine = false } = props;

  const [comment, setComment] = useState<CommentItem | null>(null);

  useEffect(() => {
    const fetchComment = async () => {
      const item = await getCommentItem(commentId);

      setComment(item);
    };
    fetchComment();
  }, [commentId]);

  const hasChildren = (comment?.kids ?? []).length > 0;
  const hasMoreThanOnceChildren = (comment?.kids ?? []).length > 1;

  if (comment?.deleted) {
    return <div className="pb-4 text-gray-500">Deleted</div>;
  }

  if (!Boolean(comment)) {
    return <Skeleton />;
  }

  if (comment) {
    return (
      <>
        <Link href={`/items/${comment.id}`}>
          <a>
            <article className="flex">
              <div className="mr-2 flex flex-col">
                <div className="flex-shrink">
                  <Link href={`/users/${comment.by}`}>
                    <a>
                      <Avatar username={comment.by} />
                    </a>
                  </Link>
                </div>
                {((depth === 0 && hasChildren) || showThreadLine) && (
                  <div className="h-full w-0.5 justify-center bg-gray-300 mx-auto"></div>
                )}
              </div>
              <div>
                <div className="flex justify-start prose-xs text-gray-500">
                  <div>@{comment.by}</div>
                  <div className="ml-2">
                    {getRelativeTime(new Date(comment.time * 1000))}
                  </div>
                </div>
                <div>
                  <HtmlContent content={comment?.text} />
                </div>
                <div className="flex py-2">
                  <CommentIcon />
                  <span className="ml-1">{(comment?.kids ?? []).length}</span>
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
          <div className="flex">
            <div className="mr-2 flex flex-col w-8 h-8 space-y-1">
              <div className="w-0.5 justify-center mx-auto"></div>
              <div className="h-1.5 w-0.5 justify-center bg-gray-300 mx-auto"></div>
              <div className="h-1 w-0.5 justify-center bg-gray-300 mx-auto"></div>
              <div className="h-0.5 w-0.5 justify-center bg-gray-300 mx-auto"></div>
            </div>

            <Link href={`/items/${comment.id}`} passHref>
              <StyledAnchor>Show this thread</StyledAnchor>
            </Link>
          </div>
        )}
      </>
    );
  }

  return null;
};

export default CommentListItem;

import { useCallback, useEffect, useState } from "react";

import List from "../components/List";
import { CommentItem } from "../interfaces";
import { getItem } from "../services/api";
import { getRelativeTime } from "../utils/date";

interface CommentListItemProps {
  commentId: number;
  loadmoreItemCount?: number;
}

const CommentListItem = (props: CommentListItemProps) => {
  const { commentId, loadmoreItemCount = 1 } = props;

  const [comment, setComment] = useState<CommentItem | null>(null);
  const [listDisplayCount, setListDisplayCount] = useState(loadmoreItemCount);

  useEffect(() => {
    const fetchComment = async () => {
      const item = await getItem(commentId);

      setComment(item);
    };
    fetchComment();
  }, [commentId]);

  const handleLoadMore = useCallback(() => {
    setListDisplayCount(listDisplayCount + loadmoreItemCount);
  }, [listDisplayCount]);

  const hasChildren = (comment?.kids ?? []).length > 0;
  const shouldDisplayLoadMoreButton =
    (comment?.kids ?? []).length !== listDisplayCount;

  if (comment?.deleted) {
    return (
      <div className="p-4">
        <div className="text-gray-500">Deleted</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {comment ? (
        <div>
          <div className="flex justify-start prose-sm text-gray-500">
            <div>{comment.by}</div>
            <div className="ml-2">
              {getRelativeTime(new Date(comment.time * 1000))}
            </div>
          </div>
          <div>
            <div dangerouslySetInnerHTML={{ __html: comment.text }} />
          </div>
          <div>sub-comments count: {(comment?.kids ?? []).length}</div>
          {hasChildren && (
            <>
              <List component="div">
                {(comment?.kids ?? [])
                  .slice(0, listDisplayCount)
                  .map((subCommentId) => (
                    <CommentListItem
                      key={subCommentId}
                      commentId={subCommentId}
                    />
                  ))}
              </List>
              {shouldDisplayLoadMoreButton && (
                <button
                  className="m-auto bg-amber-400 rounded-lg p-2"
                  onClick={handleLoadMore}
                >
                  Load More
                </button>
              )}
            </>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CommentListItem;

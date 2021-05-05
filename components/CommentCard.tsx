import { CommentItem } from "../interfaces";
import { getRelativeTime } from "../utils/date";

interface CommentCardProps {
  comment: CommentItem;
}

const CommentCard = (props: CommentCardProps) => {
  const { comment } = props;

  if (comment.deleted) {
    return <div className="m-4">Delected</div>;
  }

  return (
    <div>
      <div className="m-4">
        <div className="flex flex-wrap prose-sm text-gray-500">
          <span className="mr-1">{`by ${comment.by}`}</span>
          <span className="mr-1">{" | "}</span>
          <span className="mr-1">
            {getRelativeTime(new Date(comment.time * 1000))}
          </span>
          <span className="mr-1">{" | "}</span>
          <span>parent: {comment.parent}</span>
        </div>

        <div>
          <p className="prose-sm text-gray-500">
            <div className="flex flex-wrap prose-sm text-gray-700">
              <div dangerouslySetInnerHTML={{ __html: comment?.text }}></div>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;

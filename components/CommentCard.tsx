import { CommentIcon } from "../components/icons";
import HtmlContent from "../components/HtmlContent";
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
    <article className="w-full">
      <div className="p-4">
        <div className="flex flex-wrap prose-sm text-gray-700">
          <span className="">{`@${comment.by}`}</span>
          <span className="ml-2">
            {getRelativeTime(new Date(comment.time * 1000))}
          </span>
        </div>
        <div>
          <p className="prose-xs text-gray-500">
            <div className="flex flex-wrap prose-xs text-gray-700">
              <HtmlContent content={comment?.text} />
            </div>
          </p>
        </div>
        <div className="flex flex-wrap prose-sm text-gray-700">
          <div className="flex">
            <CommentIcon />
            <span className="ml-2">{`${(comment.kids ?? []).length}`}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CommentCard;

import { CommentIcon } from "../components/icons";
import { StoryItem } from "../interfaces";
import { getRelativeTime } from "../utils/date";

interface StoryCardProps {
  story: StoryItem;
}

const StoryCard = (props: StoryCardProps) => {
  const { story } = props;

  if (story.deleted) {
    return <div className="m-4">Delected</div>;
  }

  return (
    <article className="w-full">
      <div className="p-4">
        <div className="flex flex-wrap prose-sm text-gray-700">
          <span className="">{`@${story.by}`}</span>
          <span className="ml-2">
            {`${getRelativeTime(new Date(story.time * 1000))}`}
          </span>
        </div>
        <div>
          <p className="prose-sm text-gray-500">
            <span className="inline prose-lg text-black">{story?.title}</span>
            {story?.url && <> ({new URL(story?.url).hostname})</>}
          </p>
        </div>
        <div className="flex flex-wrap prose-sm text-gray-700">
          <span className="mr-1">{`${story?.score} points`}</span>
          <span className="mr-1">{" | "}</span>
          <div className="flex">
            <CommentIcon />
            <span className="ml-2">{`${(story.kids ?? []).length}`}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default StoryCard;

import { StoryItem } from "../interfaces";
import { getRelativeTime } from "../utils/date";

interface StoryCardProps {
  story: StoryItem;
}

const StoryCard = (props: StoryCardProps) => {
  const { story } = props;

  return (
    <div className="m-4">
      <div>
        <p className="prose-sm text-gray-500">
          <span className="inline prose-lg text-black">{story?.title}</span>
          {story?.url && <> ({new URL(story?.url).hostname})</>}
        </p>
      </div>
      <div className="flex flex-wrap prose-sm text-gray-700">
        <span className="mr-1">{`${story?.score} points`}</span>
        <span className="mr-1">{`by ${story?.by}`}</span>
        <span className="mr-1">{" | "}</span>
        <span className="mr-1">
          {getRelativeTime(new Date(story.time * 1000))}
        </span>
        <span className="mr-1">{" | "}</span>
        <span>{`${(story.kids ?? []).length} comments`}</span>
      </div>
    </div>
  );
};

export default StoryCard;

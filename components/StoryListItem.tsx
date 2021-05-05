import { useEffect, useState } from "react";

import { StoryItem } from "../interfaces";
import { getItem } from "../services/api";
import { getRelativeTime } from "../utils/date";

interface StoryListItemProps {
  storyId: number;
}

const StoryListItem = (props: StoryListItemProps) => {
  const { storyId } = props;

  const [story, setStory] = useState<StoryItem | null>(null);

  useEffect(() => {
    const fetchStory = async () => {
      const item = await getItem(storyId);

      setStory(item);
    };
    fetchStory();
  }, [storyId]);

  return (
    <li className="relative box-border w-full flex justify-start items-center text-left no-underline py-2 px-4 shadow-sm">
      {story ? (
        <div>
          <div>
            <p className="prose-sm text-gray-500">
              <span className="inline prose-lg text-black">{story.title}</span>
              {story.url && <> ({new URL(story.url).hostname})</>}
            </p>
          </div>
          <div className="flex flex-wrap prose-sm text-gray-700">
            <span className="mr-1">{`${story.score} points`}</span>
            <span className="mr-1">{`by ${story.by}`}</span>
            <span className="mr-1">{" | "}</span>
            <span className="mr-1">{`${getRelativeTime(
              new Date(story.time * 1000)
            )}`}</span>
            <span className="mr-1">{" | "}</span>
            <span>{`${(story?.kids ?? []).length} comments`}</span>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </li>
  );
};

export default StoryListItem;

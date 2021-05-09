import { useEffect, useState } from "react";

import { StoryItem } from "../interfaces";
import { getItem } from "../services/api";
import { getRelativeTime } from "../utils/date";

const Skeleton = () => (
  <div className="flex w-full space-x-4 animate-pulse">
    <div className="flex-1 space-y-4 py-1">
      <div className="h-3 bg-amber-100 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-amber-100 rounded"></div>
        <div className="h-4 bg-amber-100 rounded w-4/6"></div>
      </div>
    </div>
  </div>
);

interface StoryListItemProps {
  storyId: number;
}

const getColorCode = (score: number) => {
  if (score < 100) return "#FDBA74";
  if (score < 300) return "#FB923C";
  if (score < 500) return "#F97316";
  if (score < 1000) return "#EA580C";
  if (score < 2000) return "#C2410C";
};

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
    <li className="relative box-border w-full flex justify-start items-center text-left no-underline py-3 px-4 border-b">
      {story ? (
        <div className="w-full">
          <div className="flex flex-wrap prose-sm text-gray-700">
            <span className="">{`@${story.by}`}</span>
            <span className="ml-2">{`${getRelativeTime(
              new Date(story.time * 1000)
            )}`}</span>
            <div className="flex ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 20 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M7 14l5-5 5 5H7z" fill={getColorCode(story.score)} />
              </svg>
              <span>{`${story.score}`}</span>
            </div>
            <div className="flex ml-3">
              <svg
                className="m-auto"
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 0 24 24"
                width="18px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
              </svg>
              <span className="ml-1">{`${(story?.kids ?? []).length}`}</span>
            </div>
          </div>
          <div className="mt-2">
            <p className="prose-sm text-gray-500">
              <span className="inline prose-lg text-black">{story.title}</span>
              {story.url && <> ({new URL(story.url).hostname})</>}
            </p>
          </div>
        </div>
      ) : (
        <Skeleton />
      )}
    </li>
  );
};

export default StoryListItem;

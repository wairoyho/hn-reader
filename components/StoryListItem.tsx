import { useEffect, useState } from "react";

import { StoryItem } from "../interfaces";
import { getItem } from "../services/api";
import { getRelativeTime } from "../utils/date";

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
    <li className="relative box-border w-full flex justify-start items-center text-left no-underline py-3 px-4 shadow-sm">
      {story ? (
        <div className="w-full">
          <div className="flex flex-wrap prose-sm text-gray-700">
            {/* <span className="mr-1">{`${story.score} points`}</span> */}
            <span className="">{`@${story.by}`}</span>
            {/* <span className="ml-1">{" | "}</span> */}
            <span className="ml-2">{`${getRelativeTime(
              new Date(story.time * 1000)
            )}`}</span>
            <div className="flex ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M7 14l5-5 5 5H7z" fill={getColorCode(story.score)} />
              </svg>
              <span>{`${story.score}`}</span>
            </div>
            {/* <span className="ml-2">💛 {`${story.score}`}</span> */}
            {/* <span className="ml-1">{" | "}</span> */}
            <div className="flex ml-auto">
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
        <div>Loading...</div>
      )}
    </li>
  );
};

export default StoryListItem;

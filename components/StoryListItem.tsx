import { useEffect, useState } from "react";

import { StoryItem } from "../interfaces";
import { getItem } from "../services/api";

// in miliseconds
const units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

// @ts-ignore
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

const getRelativeTime = (d1: any, d2 = new Date()) => {
  // @ts-ignore
  const elapsed = d1 - d2;

  // "Math.abs" accounts for both "past" & "future" scenarios

  for (const u in units) {
    // @ts-ignore
    if (Math.abs(elapsed) > units[u] || u == "second")
      // @ts-ignore
      return rtf.format(Math.round(elapsed / units[u]), u);
  }
};

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
          <div className="flex prose-sm text-gray-700">
            <span>
              {`${story.score} points`}
              {" | "}
              {`by ${story.by}`}
              {" | "}
              {`${getRelativeTime(new Date(), new Date(story.time * 1000))}`}
              {" | "}
              {`${(story?.kids ?? []).length} comments`}
            </span>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </li>
  );
};

export default StoryListItem;

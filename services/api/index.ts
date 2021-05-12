import { StoryListType, NewsItem, StoryItem } from "../../interfaces";

const baseUrl = "https://hacker-news.firebaseio.com";

const handleError = (err: any) => {
  console.warn(err);
  return new Response(
    JSON.stringify({
      code: 400,
      message: "Network Error",
    })
  );
};

const apiInstance = async (path: string) => {
  const response = await fetch(`${baseUrl}${path}`).catch(handleError);
  const data = await response.json();

  return data;
};

export const getStoryList = async (type: StoryListType) =>
  await apiInstance(`/v0/${type}stories.json`);

export const getItem = async (itemId: number): Promise<NewsItem> =>
  await apiInstance(`/v0/item/${itemId}.json`);

export const geStoryItem = getItem as (itemId: number) => Promise<StoryItem>;

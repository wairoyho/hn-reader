import { NewsItem } from "../../../interfaces";

import CommentCard from "./CommentCard";
import StoryCard from "./StoryCard";

interface NewsCardProps {
  item: NewsItem;
}

const NewsCard = (props: NewsCardProps) => {
  const { item } = props;

  let newsItem;
  if (item.type === "story") {
    newsItem = <StoryCard story={item} />;
  }

  if (item.type === "comment") {
    newsItem = <CommentCard comment={item} />;
  }

  return <div style={{ borderBottomWidth: "1px" }}>{newsItem}</div>;
};

export default NewsCard;

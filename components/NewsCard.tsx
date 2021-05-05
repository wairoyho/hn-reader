import { NewsItem } from "../interfaces";

import CommentCard from "./CommentCard";
import StoryCard from "./StoryCard";

interface NewsCardProps {
  item: NewsItem;
}

const NewsCard = (props: NewsCardProps) => {
  const { item } = props;

  if (item.type === "story") {
    return <StoryCard story={item} />;
  }

  if (item.type === "comment") {
    return <CommentCard comment={item} />;
  }

  return <div>Unknown Item Type</div>;
};

export default NewsCard;

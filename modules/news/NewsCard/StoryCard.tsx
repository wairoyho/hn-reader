import { StoryItem } from "../../../interfaces";

import { Icon } from "../../../modules/icon";
import { Typography } from "../../../modules/ui";

import { Card, CardHeader, CardContent, CardFooter } from "./Card";

interface StoryCardProps {
  story: StoryItem;
}

const StoryCard = (props: StoryCardProps) => {
  const { story } = props;

  if (story.deleted) {
    return <div style={{ margin: "1rem" }}>Deleted</div>;
  }

  return (
    <Card>
      <CardHeader username={story.by} time={story.time} />
      <CardContent>
        <Typography color="textSecondary">
          <Typography component="h2" variant="h5" color="textPrimary">
            {story?.title}
          </Typography>
          {story?.url && <> ({new URL(story?.url).hostname})</>}
        </Typography>
      </CardContent>
      <CardFooter>
        <Typography
          color="textSecondary"
          component="span"
          style={{ marginRight: "0.25rem" }}
        >
          {`${story?.score} points`}
        </Typography>
        <Typography
          color="textSecondary"
          component="span"
          style={{ marginRight: "0.25rem" }}
        >
          {" | "}
        </Typography>
        <Typography
          color="textSecondary"
          component="span"
          style={{ display: "inline-flex", marginLeft: "0.5rem" }}
        >
          <Icon icon="comment" />
          <div style={{ marginRight: "0.5rem" }} />
          {`${(story.kids ?? []).length}`}
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default StoryCard;

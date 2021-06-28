import { CommentItem } from "../../../interfaces";

import { HtmlContent } from "../../../modules/common";
import { Icon } from "../../../modules/icon";
import { Typography } from "../../../modules/ui";

import { Card, CardHeader, CardContent, CardFooter } from "./Card";

interface CommentCardProps {
  comment: CommentItem;
}

const CommentCard = (props: CommentCardProps) => {
  const { comment } = props;

  if (comment.deleted) {
    return <div style={{ margin: "1rem" }}>Deleted</div>;
  }

  return (
    <Card>
      <CardHeader username={comment.by} time={comment.time} />
      <CardContent>
        <Typography>
          <HtmlContent content={comment?.text} />
        </Typography>
      </CardContent>
      <CardFooter>
        <Typography
          color="textSecondary"
          component="span"
          style={{ display: "inline-flex", marginLeft: "0.5rem" }}
        >
          <Icon icon="comment" />
          <div style={{ marginRight: "0.5rem" }} />
          {`${(comment.kids ?? []).length}`}
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default CommentCard;

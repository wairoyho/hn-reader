import { getRelativeTime } from "../../../utils/date";

import { Typography } from "../../../modules/ui";

import styles from "./Card.module.scss";

export const CardHeader = ({
  username,
  time,
}: {
  username: string;
  time: number;
}) => {
  return (
    <div className={styles.cardHeader}>
      <Typography component="span" variant="subtitle2" color="textSecondary">
        {`@${username}`}
      </Typography>
      <div className={styles.space} />
      <Typography component="span" variant="subtitle2" color="textSecondary">
        {getRelativeTime(new Date(time * 1000))}
      </Typography>
    </div>
  );
};

export const CardContent = ({ children }: { children: any }) => {
  return <div>{children}</div>;
};

export const CardFooter = ({ children }: { children: any }) => {
  return <div className={styles.cardFooter}>{children}</div>;
};

export const Card = ({ children }: { children: any }) => {
  return (
    <article className={styles.card}>
      <div className={styles.container}>{children}</div>
    </article>
  );
};

export default Card;

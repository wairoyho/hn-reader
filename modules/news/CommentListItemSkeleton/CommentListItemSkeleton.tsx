import styles from "./CommentListItemSkeleton.module.scss";

const CommentListItemSkeleton = () => {
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <div className={styles.title} />
        <div className={styles.content}>
          <div className={styles["line-w-full"]} />
          <div className={styles["line-w-full"]} />
          <div className={styles["line-w-2/3"]} />
        </div>
      </div>
    </div>
  );
};

export default CommentListItemSkeleton;

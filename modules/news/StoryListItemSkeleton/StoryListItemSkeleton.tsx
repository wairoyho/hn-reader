import styles from "./StoryListItem.module.scss";

const StoryListItemSkeleton = () => {
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <div className={styles.title} />
        <div className={styles.content}>
          <div className={styles.line1} />
          <div className={styles.line2} />
        </div>
      </div>
    </div>
  );
};

export default StoryListItemSkeleton;

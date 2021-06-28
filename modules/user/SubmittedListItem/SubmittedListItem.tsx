import styles from "./SubmittedListItem.module.scss";

const SubmittedListItem = ({ children }: { children: any }) => {
  return <div className={styles.root}>{children}</div>;
};

export default SubmittedListItem;

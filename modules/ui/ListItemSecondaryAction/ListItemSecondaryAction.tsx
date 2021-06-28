import styles from "./ListItemSecondaryAction.module.scss";

interface ListItemSecondaryActionProps {
  children: React.ReactNode;
}

const ListItemSecondaryAction = (props: ListItemSecondaryActionProps) => {
  const { children } = props;

  return <div className={styles.root}>{children}</div>;
};

export default ListItemSecondaryAction;

import { ReactNode } from "react";
import styles from "./ListItemSecondaryAction.module.scss";

interface ListItemSecondaryActionProps {
  children: ReactNode;
}

const ListItemSecondaryAction = (props: ListItemSecondaryActionProps) => {
  const { children } = props;

  return <div className={styles.root}>{children}</div>;
};

export default ListItemSecondaryAction;

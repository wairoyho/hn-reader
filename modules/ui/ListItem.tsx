import { ReactNode } from "react";
import styles from "./ListItem.module.css";

import { composeClasses } from "./styles";

interface ListItemProps {
  children: ReactNode;
  disableGutters?: boolean;
  divider?: boolean;
}

const ListItem = (props: ListItemProps) => {
  const { children, disableGutters = false, divider = false } = props;

  const className = composeClasses(styles.root, {
    ...(!disableGutters && { gutters: styles.gutters }),
    ...(divider && { divider: styles.divider }),
  });

  return <li className={className}>{children}</li>;
};

export default ListItem;

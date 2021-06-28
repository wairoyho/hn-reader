import { composeClasses } from "../styles";

import styles from "./ListItem.module.css";

interface ListItemProps {
  children: React.ReactNode;
  component?: React.ElementType;
  disableGutters?: boolean;
  divider?: boolean;
}

const ListItem = (props: ListItemProps) => {
  const {
    children,
    component = "li",
    disableGutters = false,
    divider = false,
  } = props;

  const className = composeClasses(styles.root, {
    ...(!disableGutters && { gutters: styles.gutters }),
    ...(divider && { divider: styles.divider }),
  });

  const Component = component;

  return <Component className={className}>{children}</Component>;
};

export default ListItem;

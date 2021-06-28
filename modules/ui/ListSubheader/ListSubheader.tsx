import { composeClasses } from "../styles";

import styles from "./ListSubheader.module.scss";

interface ListSubheaderProps {
  children: React.ReactNode;
  disableGutters?: boolean;
  disableSticky?: boolean;
}

const ListSubheader = (props: ListSubheaderProps) => {
  const { children, disableGutters = false, disableSticky = false } = props;

  const classes = composeClasses(styles.root, {
    ...(!disableGutters && { gutter: styles.gutter }),
    ...(!disableSticky && { sticky: styles.sticky }),
  });

  return <li className={classes}>{children}</li>;
};

export default ListSubheader;

import { composeClasses } from "../../ui/styles";

import styles from "./BottomNavigation.module.scss";

interface BottomNavigation {
  className?: string;
  children?: React.ReactNode;
}

const BottomNavigation = (props: BottomNavigation) => {
  const { className, children } = props;

  const clx = composeClasses(styles.root, { override: className });

  return <div className={clx}>{children}</div>;
};

export default BottomNavigation;

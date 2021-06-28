import React from "react";
import { composeClasses } from "../styles";
import styles from "./BottomNavigationAction.module.scss";

interface BottomNavigationActionProps {
  active?: boolean;
  component?: React.ElementType;
  icon: React.ReactNode;
}

const BottomNavigationAction = React.forwardRef(function BottomNavigationAction(
  props: BottomNavigationActionProps,
  ref: any
) {
  const { active = false, component = "span", icon, ...other } = props;

  const clx = composeClasses(styles.root, {
    ...(active && { active: styles.active }),
  });

  const Component = component;

  return (
    <Component className={clx} ref={ref} {...other}>
      {icon}
      {/* <span className={styles.label}>{label}</span> */}
    </Component>
  );
});

export default BottomNavigationAction;

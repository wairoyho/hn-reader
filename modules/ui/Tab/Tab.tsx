import React from "react";
import { composeClasses } from "../styles";
import styles from "./Tab.module.scss";

interface TabProps {
  component?: React.ElementType;
  href?: string;
  label: string;
  selected?: boolean;
  [x: string]: any;
}

const Tab = React.forwardRef(function Tab(props: TabProps, ref: any) {
  const {
    component = "button",
    href,
    label,
    selected = false,
    value,
    ...other
  } = props;

  const Component = component;

  const indicatorContentClx = composeClasses(styles.indicatorContent, {
    underline: styles.indicatorUnderline,
    ...(selected && { selected: styles.indicatorActive }),
  });

  return (
    <Component className={styles.root} ref={ref} role="tab" {...other}>
      <span className={styles.tabContent}>{label}</span>
      <span className={styles.indicator}>
        {selected && <span className={indicatorContentClx} />}
      </span>
    </Component>
  );
});

export default Tab;

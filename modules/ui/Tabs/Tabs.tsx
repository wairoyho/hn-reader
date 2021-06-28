import React from "react";

import styles from "./Tabs.module.scss";

interface TabsProps {
  children: React.ReactElement[];
  component?: React.ElementType;
  [x: string]: any;
}

const Tabs = React.forwardRef(function Tabs(props: TabsProps, ref: any) {
  // const Tabs = (props: TabsProps) => {
  const { children, component = "div" } = props;

  const Component = component;

  return (
    <Component className={styles.root} ref={ref} role="tablist">
      {children}
    </Component>
  );
});

export default Tabs;

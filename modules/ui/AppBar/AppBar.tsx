import { composeClasses } from "../styles";

import styles from "./AppBar.module.scss";

interface AppBarProps {
  children: React.ReactNode;
  color?: "default" | "inherit" | "primary" | "secondary" | "transparent";
  component?: React.ElementType;
  position?: "absolute" | "fixed" | "relative" | "static" | "sticky";
  border?: boolean;
  [x: string]: any;
}

const AppBar = (props: AppBarProps) => {
  const {
    border = false,
    children,
    color = "default",
    component = "header",
    position = "fixed",
    ...other
  } = props;

  const classes = composeClasses(styles.root, {
    ...(border && { border: styles.border }),
    color: styles[`color-${color}`],
    position: styles[`position-${position}`],
  });

  const Component = component;

  return (
    <Component className={classes} {...other}>
      {children}
    </Component>
  );
};

export default AppBar;

import { composeClasses } from "../styles";

import styles from "./Toolbar.module.scss";

interface ToolbarProps {
  children?: React.ReactNode;
  component?: React.ElementType;
  disableGutters?: boolean;
  variant?: "dense" | "regular";
}

const Toolbar = (props: ToolbarProps) => {
  const {
    children,
    component = "div",
    disableGutters = false,
    variant = "regular",
  } = props;

  const classes = composeClasses(styles.root, {
    ...(!disableGutters && { gutters: styles.gutters }),
    ...(variant && { variant: styles[`variant-${variant}`] }),
  });

  const Component = component;

  return <Component className={classes}>{children}</Component>;
};

export default Toolbar;

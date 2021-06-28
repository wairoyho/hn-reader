import { composeClasses } from "../styles";

import { Button } from "..";

import styles from "./IconButton.module.scss";

interface IconButtonProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  [x: string]: any;
}

const IconButton = (props: IconButtonProps) => {
  const { children, size = "medium", ...other } = props;

  const classes = composeClasses(styles.root, {
    ...(size && { size: styles[`size-${size}`] }),
  });

  return (
    <Button className={classes} variant="text" {...other}>
      {children}
    </Button>
  );
};

export default IconButton;

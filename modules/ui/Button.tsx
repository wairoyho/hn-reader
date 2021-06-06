import { ReactNode } from "react";
import { composeClasses } from "./styles";

import styles from "./Button.module.scss";

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  variant?: "contained" | "outlined" | "text";
  [x: string]: any;
}

const Button = (props: ButtonProps) => {
  const { children, disabled, variant = "text", ...other } = props;

  const classes = composeClasses(styles.root, {
    ...(variant && { variant: styles[`variant-${variant}`] }),
    ...(disabled && { disabled: styles.disabled }),
  });

  return (
    <button className={classes} disabled={disabled} {...other}>
      {children}
    </button>
  );
};

export default Button;

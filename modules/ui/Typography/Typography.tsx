import { composeClasses } from "../styles";

import styles from "./Typography.module.scss";

interface TypographyProps {
  align?: "center" | "inherit" | "justify" | "left" | "right";
  children: React.ReactNode;
  color?:
    | "initial"
    | "inherit"
    | "primary"
    | "secondary"
    | "textPrimary"
    | "textSecondary"
    | "error";
  component?: React.ElementType;
  display?: "initial" | "block" | "inline";
  gutterBottom?: boolean;
  noWrap?: boolean;
  paragraph?: boolean;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    // | "button"
    // | "overline"
    // | "srOnly"
    | "inherit";
  variantMapping?: any;
  [x: string]: any;
}

const defaultVariantMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  caption: "p",
  inherit: "p",
};

const Typography = (props: TypographyProps) => {
  const {
    align = "inherit",
    children,
    color = "initial",
    component,
    display = "initial",
    gutterBottom = false,
    noWrap = false,
    paragraph = false,
    variant = "body1",
    variantMapping = defaultVariantMapping,
    ...other
  } = props;

  const clx = composeClasses(styles.root, {
    align: styles[`align-${align}`],
    color: styles[`color-${color}`],
    display: styles[`display-${display}`],
    ...(gutterBottom && { gutterBottom: styles.gutterBottom }),
    ...(noWrap && { noWrap: styles.noWrap }),
    ...(paragraph && { paragraph: styles.paragraph }),
    variant: styles[`variant-${variant}`],
  });

  const Component =
    component ||
    (paragraph
      ? "p"
      : variantMapping[variant] || defaultVariantMapping[variant]) ||
    "span";

  return (
    <Component className={clx} {...other}>
      {children}
    </Component>
  );
};

export default Typography;

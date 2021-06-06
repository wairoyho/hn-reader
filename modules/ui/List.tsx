import styles from "./List.module.scss";

import { composeClasses } from "./styles";

interface ListProps {
  children: React.ReactNode;
  component?: React.ElementType;
  subheader?: React.ReactNode;
}

const List = (props: ListProps) => {
  const { children, component = "ul", subheader } = props;

  const Component = component;

  const classes = composeClasses(styles.root, {
    ...(subheader && { subHeader: styles.subHeader }),
  });

  return (
    <Component className={classes}>
      {subheader}
      {children}
    </Component>
  );
};

export default List;

import styles from "./ListItemText.module.scss";

interface ListItemTextProps {
  primary: string;
  secondary?: string;
}

const ListItemText = (props: ListItemTextProps) => {
  const { primary, secondary } = props;
  return (
    <div className={styles.root}>
      <p>{primary}</p>
      {secondary && <span>{secondary}</span>}
    </div>
  );
};

export default ListItemText;

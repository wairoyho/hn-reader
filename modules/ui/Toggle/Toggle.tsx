import styles from "./Toggle.module.scss";

interface ToggleProps {
  checked: boolean;
  disabled?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
}

const Toggle = (props: ToggleProps) => {
  const { checked, disabled = false, onChange, label } = props;

  return (
    <span className={styles["toggle-control"]}>
      <input
        className={styles["toggle-input"]}
        disabled={disabled}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={label}
      />
      <label htmlFor={label} />
    </span>
  );
};

export default Toggle;

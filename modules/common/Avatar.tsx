import styles from "./Avatar.module.scss";

interface AvatarProps {
  username: string;
}

const Avatar = (props: AvatarProps) => {
  const { username } = props;

  return (
    <div className={styles.root}>
      <span>{username[0]}</span>
    </div>
  );
};

export default Avatar;

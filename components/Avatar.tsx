interface AvatarProps {
  username: string;
}

const Avatar = (props: AvatarProps) => {
  const { username } = props;

  return (
    <div className="w-8 h-8 rounded-full bg-amber-700 text-white text-center leading-8">
      <span>{username[0]}</span>
    </div>
  );
};

export default Avatar;

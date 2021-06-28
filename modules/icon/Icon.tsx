import dynamic from "next/dynamic";

import { useMemo } from "react";

type IconType =
  | "arrowRight"
  | "arrowUp"
  | "back"
  | "bin"
  | "comment"
  | "home"
  | "search"
  | "settings";

// const DynamicIcon = (icon: IconType) =>
//   dynamic(
//     () => import(`./${icon.charAt(0).toUpperCase() + icon.slice(1)}Icon`)
//   );

interface IconProps {
  icon: IconType;
  [x: string]: any;
}

const Icon = (props: IconProps) => {
  const { icon, ...other } = props;

  const DynamicIcon = useMemo(
    () =>
      dynamic(
        () => import(`./${icon.charAt(0).toUpperCase() + icon.slice(1)}Icon`)
      ),
    []
  );

  return (
    <div style={{ display: "block" }}>
      <DynamicIcon {...other} />
    </div>
  );
};

export default Icon;

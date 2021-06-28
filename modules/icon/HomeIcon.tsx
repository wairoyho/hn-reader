interface HomeIconProps {
  bold?: boolean;
}

const HomeIcon = ({ bold = false }: HomeIconProps) => (
  <svg
    // className={
    //   isMatchRoute(["/", "/best", "/latest"])
    //     ? "m-auto text-white"
    //     : "m-auto"
    // }
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 9.5L12 4L21 9.5"
      stroke="currentColor"
      strokeWidth={bold ? "2.5" : "1.5"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 13V19.4C19 19.7314 18.7314 20 18.4 20H5.6C5.26863 20 5 19.7314 5 19.4V13"
      stroke="currentColor"
      strokeWidth={bold ? "2.5" : "1.5"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default HomeIcon;

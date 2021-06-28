interface ArrowUpIconProps {
  color?: string;
}

const ArrowUpIcon = ({ color }: ArrowUpIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 20 24"
    width="24px"
    fill="#000000"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M7 14l5-5 5 5H7z" fill={color ? color : "#000000"} />
  </svg>
  // <svg
  //   width="24"
  //   height="24"
  //   viewBox="0 0 24 24"
  //   fill={color}
  //   xmlns="http://www.w3.org/2000/svg"
  // >
  //   <path
  //     d="M11.4752 2.94682C11.7037 2.53464 12.2963 2.53464 12.5248 2.94682L21.8985 19.8591C22.1202 20.259 21.831 20.75 21.3738 20.75H2.62625C2.16902 20.75 1.87981 20.259 2.10146 19.8591L11.4752 2.94682Z"
  //     stroke="currentColor"
  //     strokeWidth="1.5"
  //     strokeLinecap="round"
  //     strokeLinejoin="round"
  //   />
  // </svg>
);

export default ArrowUpIcon;

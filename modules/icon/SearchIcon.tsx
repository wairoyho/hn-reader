interface SearchIconProps {
  bold?: boolean;
}

const SearchIcon = ({ bold = false }: SearchIconProps) => (
  <svg
    // className={
    //   isMatchRoute(["/explore", "/search"]) ? "m-auto text-white" : "m-auto"
    // }
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.5 15.5L19 19"
      stroke="currentColor"
      strokeWidth={bold ? "2.5" : "1.5"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z"
      stroke="currentColor"
      strokeWidth={bold ? "2.5" : "1.5"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SearchIcon;

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import useLocalStorage from "../../../hooks/useLocalStorage";

import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  onBlur?: () => void;
  onFocus: () => void;
  setShouldShowSearchPanel: (...args: any[]) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const { onFocus, setShouldShowSearchPanel } = props;

  const router = useRouter();

  const initialInput = (router.query.q ?? "").toString();
  const [inputValue, setInputValue] = useState<string>(initialInput);

  const [searchHistory, setSearchHistories] = useLocalStorage<string[]>(
    "searchHistory",
    []
  );

  useEffect(() => {
    if (router.isReady) {
      setInputValue((router.query.q ?? "").toString());
    }
  }, [router.isReady]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSearchHistories(
      searchHistory.includes(inputValue)
        ? [inputValue].concat(
            searchHistory.filter((item: string) => item !== inputValue)
          )
        : [inputValue, ...searchHistory]
    );
    router.replace(`/search?q=${inputValue}`);
    const input = document.getElementById("search-input") as HTMLInputElement;
    input.blur();
    setShouldShowSearchPanel(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form className={styles.root} autoComplete="off" onSubmit={handleSubmit}>
      <input
        className={styles.input}
        id="search-input"
        type="search"
        placeholder="Search"
        value={inputValue}
        // onBlur={onBlur}
        onChange={handleChange}
        onFocus={onFocus}
      />
    </form>
  );
};

export default SearchBar;

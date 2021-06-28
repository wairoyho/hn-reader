import Link from "next/link";
import { useCallback } from "react";

import useLocalStorage from "../../../hooks/useLocalStorage";

import { Icon } from "../../../modules/icon";
import { Typography } from "../../../modules/ui";

import styles from "./SearchPanel.module.scss";

const SearchPanel = () => {
  const [searchHistories, setSearchHistories] = useLocalStorage(
    "searchHistory",
    []
  );

  const handleDeleteSearchHistory = useCallback(
    (idx: number) => {
      setSearchHistories(searchHistories.filter((_, index) => index !== idx));
    },
    [searchHistories]
  );

  return (
    <div>
      <div role="listbox">
        <div className={styles.headline}>
          <Typography>Recent</Typography>
        </div>
        <div>
          {searchHistories.map((searchHistory, idx) => (
            <div
              key={`search-history-${idx}`}
              className={styles["search-history-item"]}
            >
              <Link
                key={`search-${searchHistory}-${idx}`}
                href={`/search?q=${searchHistory}`}
                passHref
              >
                <a>
                  <span>{searchHistory}</span>
                </a>
              </Link>
              <div
                className={styles["delete-button"]}
                onClick={() => handleDeleteSearchHistory(idx)}
              >
                <Icon icon="bin" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;

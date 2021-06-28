import { useCallback, useEffect, useState } from "react";

import useLocalStorage from "../../hooks/useLocalStorage";

import { ListItemLink } from "../../modules/common";
import { Icon } from "../../modules/icon";
import { Layout } from "../../modules/navigation";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemSecondaryAction,
  Toggle,
} from "../../modules/ui";

const SettingsIndexPage = () => {
  const [usernameInloacalStorage] = useLocalStorage("username", "");
  const [username, setUsername] = useState("");
  const [shouldToggleDisable, setShouldToggleDisable] = useState(false);

  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  useEffect(() => {
    setUsername(usernameInloacalStorage);
    setShouldToggleDisable(
      window.matchMedia("(prefers-color-scheme: dark)").matches ? true : false
    );
  }, []);

  const handleDarkModeToogleChange = useCallback(
    (_e: React.FormEvent<HTMLInputElement>) => {
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

      let themeMode;
      if (prefersDarkScheme.matches) {
        document.body.classList.toggle("light-theme");
        themeMode = document.body.classList.contains("light-theme")
          ? false
          : true;
      } else {
        document.body.classList.toggle("dark-theme");
        themeMode = document.body.classList.contains("dark-theme")
          ? true
          : false;
      }

      setDarkMode(themeMode);
    },
    [darkMode]
  );

  return (
    <Layout title="Settings">
      <List subheader={<ListSubheader>Account</ListSubheader>}>
        <Divider />
        <ListItemLink href="/settings/account/username">
          <ListItemText
            primary="Username"
            secondary={Boolean(username) ? `@${username}` : ""}
          />
          <ListItemSecondaryAction>
            <Icon icon="arrowRight" />
          </ListItemSecondaryAction>
        </ListItemLink>

        <ListSubheader>General</ListSubheader>
        <Divider />
        <ListItem>
          <ListItemText primary="Dark mode" />
          <ListItemSecondaryAction>
            <Toggle
              disabled={shouldToggleDisable}
              label="darkmode"
              checked={darkMode}
              onChange={handleDarkModeToogleChange}
            />
          </ListItemSecondaryAction>
        </ListItem>

        <ListSubheader>Miscellaneous</ListSubheader>
        <Divider />
        <ListItemLink href="/about">
          <ListItemText primary="About" />
        </ListItemLink>
      </List>
    </Layout>
  );
};

export default SettingsIndexPage;

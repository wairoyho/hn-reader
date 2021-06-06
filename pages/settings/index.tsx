import { useEffect, useState } from "react";

import Layout from "../../components/Layout";

import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemSecondaryAction,
} from "../../modules/ui";
import { ListItemLink } from "../../modules/common";
import useLocalStorage from "../../hooks/useLocalStorage";

const SettingsIndexPage = () => {
  const [usernameInloacalStorage] = useLocalStorage("username", "");
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(usernameInloacalStorage);
  }, []);

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
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ListItemSecondaryAction>
        </ListItemLink>

        <ListSubheader>General</ListSubheader>
        <Divider />
        <ListItem>
          <ListItemText primary="Dark mode" />
          <ListItemSecondaryAction>Off</ListItemSecondaryAction>
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

import { useState } from "react";

import Layout from "../../../components/Layout";

import { Button } from "../../../modules/ui";
import useLocalStorage from "../../../hooks/useLocalStorage";

const SettingsAccountUsernamePage = () => {
  const [username, setUsername] = useLocalStorage("username", "");
  const [isDirty, setIsDirty] = useState(false);
  const [inputValue, setInputValue] = useState(username);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    // @ts-ignore
    for (let pair of formData.entries()) {
      const [, value] = pair;
      setUsername(value);
    }
    setIsDirty(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDirty(true);
    setInputValue(e.target.value);
  };

  return (
    <Layout title="Settings">
      <div style={{ padding: "1rem" }}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div style={{ marginBottom: "0.5rem" }}>
            <label>Username</label>
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            <input
              name="username"
              type="text"
              value={inputValue}
              onChange={handleChange}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" type="submit" disabled={!isDirty}>
              Save
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default SettingsAccountUsernamePage;

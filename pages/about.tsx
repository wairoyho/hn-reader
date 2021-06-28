import { Layout } from "../modules/navigation";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from "../modules/ui";

const AboutPage = () => {
  return (
    <Layout title="About">
      <List subheader={<ListSubheader>Author</ListSubheader>}>
        <Divider />

        <ListItem>
          <ListItemText primary="me" />
        </ListItem>
        <ListItem>
          <ListItemText primary="twitter" />
        </ListItem>
        <ListItem>
          <ListItemText primary="github" />
        </ListItem>
      </List>
    </Layout>
  );
};

export default AboutPage;

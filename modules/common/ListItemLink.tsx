import Link from "next/link";

import { ListItem } from "../../modules/ui";

const ListItemLink = (props: any) => (
  <Link {...props}>
    <a>
      <ListItem>{props.children}</ListItem>
    </a>
  </Link>
);
export default ListItemLink;

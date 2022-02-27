import { Divider, Icon } from "semantic-ui-react";

import CenterMiddle from "../../components/blocks/CenterMiddle";
import { ColorfulLink } from "../../components/blocks/ColorfulText";

export const GroupNotFound = () => (
  <CenterMiddle style={{ minHeight: "50vh" }}>
    <Icon name="window close outline" size="massive" />
    <Divider hidden />
    <p>This group doesn't exist. It may have been deleted</p>
    <ColorfulLink to="/home">
      Find existing groups on the home page &rarr;
    </ColorfulLink>
  </CenterMiddle>
);

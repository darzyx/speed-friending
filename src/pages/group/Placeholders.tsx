import { Divider, Icon, Loader } from "semantic-ui-react";

import CenterMiddle from "../../components/blocks/CenterMiddle";
import { ColorfulLink } from "../../components/blocks/ColorfulText";

export const LoadingGroup = () => (
  <CenterMiddle style={{ minHeight: "75vh" }}>
    <Loader inverted active inline="centered" size="huge" />
  </CenterMiddle>
);

export const GroupNotFound = () => (
  <CenterMiddle style={{ minHeight: "75vh" }}>
    <Icon name="window close outline" size="massive" />
    <Divider hidden />
    <p>This group does not exist. It may have been deleted</p>
    <ColorfulLink to="/home">
      Find existing groups on the home page &rarr;
    </ColorfulLink>
  </CenterMiddle>
);

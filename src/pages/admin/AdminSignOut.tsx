import { Button, Divider, Icon } from "semantic-ui-react";

import CenterMiddle from "../../components/blocks/CenterMiddle";
import { ColorfulLink } from "../../components/blocks/ColorfulText";

type AdminSignOutPropsType = { onClickSignOut: () => void };
const AdminSignOut = ({ onClickSignOut }: AdminSignOutPropsType) => (
  <CenterMiddle>
    <p>You are now signed in</p>
    <ColorfulLink to="/home">Go home &rarr;</ColorfulLink>
    <Divider hidden />
    <Button color="blue" onClick={onClickSignOut}>
      <Icon name="twitter" /> Sign Out
    </Button>
  </CenterMiddle>
);

export default AdminSignOut;

import { Button, Icon } from "semantic-ui-react";

import CenterMiddle from "../../components/blocks/CenterMiddle";

type AdminSignOutPropsType = { onClickSignOut: () => void };
const AdminSignOut = ({ onClickSignOut }: AdminSignOutPropsType) => (
  <CenterMiddle>
    <Button color="blue" onClick={onClickSignOut}>
      <Icon name="twitter" /> Sign Out
    </Button>
  </CenterMiddle>
);

export default AdminSignOut;

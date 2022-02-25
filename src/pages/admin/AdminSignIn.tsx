import { Button, Icon } from "semantic-ui-react";

import CenterMiddle from "../../components/blocks/CenterMiddle";

type AdminSignInPropsType = { onClickSignIn: () => void };
const AdminSignIn = ({ onClickSignIn }: AdminSignInPropsType) => (
  <CenterMiddle>
    <Button color="blue" onClick={onClickSignIn}>
      <Icon name="twitter" /> Sign In With Twitter
    </Button>
  </CenterMiddle>
);

export default AdminSignIn;

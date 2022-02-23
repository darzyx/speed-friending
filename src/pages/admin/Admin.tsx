import { useEffect } from "react";
import styled from "styled-components";

import CenterMiddle, {
  centerMiddleCSS,
} from "../../components/blocks/CenterMiddle";
import { Divider, Header, Segment } from "semantic-ui-react";
import AdminSignInForm from "./AdminSignInForm";
import { ColorfulLink } from "../../components/blocks/ColorfulText";
import theme from "../../styles/theme";
import { Link } from "react-router-dom";

const AdminContainer = styled.div`
  ${centerMiddleCSS}
  margin: 0;
  padding: 0;
`;

type AdminPropsType = {
  userIsAdmin: boolean;
  setUserIsAdmin: (userIsAdmin: boolean) => void;
};
const Admin = ({ userIsAdmin, setUserIsAdmin }: AdminPropsType) => {
  // Reset scroll on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AdminContainer>
      <Header inverted as="h1" textAlign="center">
        <Header.Subheader style={{ margin: "7px" }}>Admin</Header.Subheader>
        Sign In
      </Header>
      {userIsAdmin ? (
        <Segment
          inverted
          style={{
            width: "100%",
            maxWidth: "500px",
            color: theme.color.text,
            backgroundColor: theme.color.three,
          }}
        >
          <CenterMiddle>
            <p style={{ textAlign: "center" }}>Already signed in as admin</p>
            <Link to="/home">&larr; Go Home</Link>
          </CenterMiddle>
        </Segment>
      ) : (
        <AdminSignInForm setUserIsAdmin={setUserIsAdmin} />
      )}
      <Divider hidden />
      {!userIsAdmin && (
        <CenterMiddle>
          <p style={{ textAlign: "center" }}>Not an administrator?</p>
          <ColorfulLink to="/"> &larr; Go home to select group</ColorfulLink>
        </CenterMiddle>
      )}
    </AdminContainer>
  );
};

export default Admin;

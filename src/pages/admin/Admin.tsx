import styled from "styled-components";

import CenterMiddle, {
  centerMiddleCSS,
} from "../../components/blocks/CenterMiddle";
import { Divider, Header } from "semantic-ui-react";
import AdminSignInForm from "./AdminSignInForm";
import { ColorfulLink } from "../../components/blocks/ColorfulText";

const AdminContainer = styled.div`
  ${centerMiddleCSS}
  margin: 0;
  padding: 0;
`;

const Admin = () => {
  return (
    <AdminContainer>
      <Header inverted as="h1" textAlign="center">
        <Header.Subheader style={{ margin: "7px" }}>Admin</Header.Subheader>
        Enter Password
      </Header>
      <AdminSignInForm />
      <Divider hidden />
      <CenterMiddle>
        <p style={{ textAlign: "center" }}>Not an administrator?</p>
        <ColorfulLink to="/"> &larr; Go home to select group</ColorfulLink>
      </CenterMiddle>
    </AdminContainer>
  );
};

export default Admin;

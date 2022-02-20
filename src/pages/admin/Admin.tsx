import styled from "styled-components";

import { centerMiddleCSS } from "../../components/blocks/CenterMiddle";
import { Header } from "semantic-ui-react";
import SignInForm from "./SignInForm";

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
        Sign In
      </Header>
      <SignInForm />
    </AdminContainer>
  );
};

export default Admin;

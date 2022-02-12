import { Button } from "semantic-ui-react";
import styled from "styled-components";

const NavButton = styled(Button).attrs({ secondary: true })`
  &&&& {
    background-color: #1b1c1d !important;
  }
`;

export default NavButton;

import { Button } from "semantic-ui-react";
import styled from "styled-components";

const NavButton = styled(Button).attrs({ active: true })`
  &&&& {
    margin: 0;
  }
`;

export default NavButton;

import { Button } from "semantic-ui-react";
import styled from "styled-components";

const NavButton = styled(Button)`
  &&&& {
    margin: ${({ margin }) => (margin ? margin : "0")};
    background-color: ${({ theme }) => theme.color.two};
    color: ${({ theme }) => theme.color.text};
  }
`;

export default NavButton;

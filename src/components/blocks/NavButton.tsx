import { Button } from "semantic-ui-react";
import styled from "styled-components";
import themeStyles from "../../styles/themeStyles";

const NavButton = styled(Button)`
  &&&& {
    margin: 0;
    background-color: ${themeStyles.color.two};
    color: ${themeStyles.color.text};
  }
`;

export default NavButton;

import { Icon } from "semantic-ui-react";
import styled from "styled-components";

import { colorChange } from "../styles/keyframes";

const Heart = styled(Icon).attrs({ name: "heart" })`
  &&&& {
    animation-name: ${colorChange};
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
    margin: 0;
  }
`;

const StyledDiv = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 5px 8px;
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.two};
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
`;

const AppFooter = () => (
  <StyledDiv>
    created with <Heart />
  </StyledDiv>
);

export default AppFooter;

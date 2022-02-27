import { Icon } from "semantic-ui-react";
import styled, { keyframes } from "styled-components";

import { themeType } from "../styles/theme";

const colorChange = ({ theme }: { theme: themeType }) => keyframes`
  0% { color: ${theme.color.blue}; }
  33% { color: ${theme.color.purple}; }
  66% { color: ${theme.color.purple}; }
  100% { color: ${theme.color.pink}; }
`;

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
  padding: 5px 8px;
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.two};
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
`;

const AppFooter = () => (
  <StyledDiv>
    created with <Heart /> by vrai
  </StyledDiv>
);

export default AppFooter;

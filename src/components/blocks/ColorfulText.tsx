import { Header } from "semantic-ui-react";
import styled, { css, keyframes } from "styled-components";

const colorChange = keyframes`
  0% { color: #a84677; }
  25% { color: #009494; }
  50% { color: #6495ed; }
  100% { color: #9d4ebd; }
`;

export const colorfulTextAnimationCSS = css`
  animation-name: ${colorChange};
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
`;

export const ColorfulHeader = styled(Header)`
  &&&& {
    ${colorfulTextAnimationCSS};
    text-align: center;
  }
`;

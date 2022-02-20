import { Link } from "react-router-dom";
import { Header } from "semantic-ui-react";
import styled, { css, keyframes } from "styled-components";

const colorChange = keyframes`
  0% { color: #773d5a; }
  25% { color: #00635e; }
  50% { color: #415f97; }
  100% { color: #713888; }
`;

export const colorfulTextAnimationCSS = css`
  animation-name: ${colorChange};
  animation-duration: 6s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: linear;
`;

export const ColorfulHeader = styled(Header)`
  &&&& {
    ${colorfulTextAnimationCSS};
    text-align: center;
  }
`;

export const ColorfulLink = styled(Link)`
  &&&& {
    ${colorfulTextAnimationCSS};
    text-align: center;
    font-weight: bold;
  }
`;

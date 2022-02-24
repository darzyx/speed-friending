import { Link } from "react-router-dom";
import { Header } from "semantic-ui-react";
import styled, { css, keyframes } from "styled-components";

const colorChange = keyframes`
  0% { color: #648FFF; }
  33% { color: #785EF0; }
  66% { color: #785EF0; }
  100% { color: #DC267F; }
`;

export const colorfulTextAnimationCSS = css`
  animation-name: ${colorChange};
  animation-duration: 2s;
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

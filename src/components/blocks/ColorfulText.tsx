import { Link } from "react-router-dom";
import { Header } from "semantic-ui-react";
import styled, { css, keyframes } from "styled-components";
import { themeType } from "../../styles/theme";

const colorChange = ({ theme }: { theme: themeType }) => keyframes`
  0% { color: ${theme.color.blue}; }
  33% { color: ${theme.color.purple}; }
  66% { color: ${theme.color.purple}; }
  100% { color: ${theme.color.pink}; }
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

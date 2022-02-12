import { Header } from "semantic-ui-react";
import styled, { keyframes } from "styled-components";

const colorChange = keyframes`
  0% { color: #008080; }
  50% { color: #c25089; }
  100% { color: #6495ed; }
`;

export const ColorfulHeader = styled(Header).attrs({
  inverted: true,
  textAlign: "center",
})`
  animation-name: ${colorChange};
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
`;

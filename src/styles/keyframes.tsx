import { keyframes } from "styled-components";
import { themeType } from "./theme";

export const colorChange = ({ theme }: { theme: themeType }) => keyframes`
  0% { color: ${theme.color.blue}; }
  33% { color: ${theme.color.purple}; }
  66% { color: ${theme.color.purple}; }
  100% { color: ${theme.color.pink}; }
`;

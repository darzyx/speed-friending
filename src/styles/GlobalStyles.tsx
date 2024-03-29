import { createGlobalStyle } from "styled-components";
import { themeType } from "./theme";

const GlobalStyles = createGlobalStyle`
html,
body,
#root,
.App {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  color: ${({ themeStyles }: { themeStyles: themeType }) =>
    themeStyles.color.text};
  background-color: ${({ themeStyles }: { themeStyles: themeType }) =>
    themeStyles.color.one};
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}
`;

export default GlobalStyles;

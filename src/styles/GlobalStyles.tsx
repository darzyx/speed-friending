import { createGlobalStyle } from "styled-components";
import theme from "./theme";

type GlobalStylesPropsTyle = { inverted: boolean };
const GlobalStyles = createGlobalStyle<GlobalStylesPropsTyle>`
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
  color: ${(props) => (props.inverted ? theme.color.text : theme.color.one)};
  background-color: ${(props) =>
    props.inverted ? theme.color.one : theme.color.text};
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

/* Semantic UI Popup component overwrite */
.ui.popup,
.ui.popup::before {
  background-color: rgb(69, 87, 102) !important;
}
`;

export default GlobalStyles;

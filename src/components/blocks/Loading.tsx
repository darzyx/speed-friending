import { Loader } from "semantic-ui-react";

import CenterMiddle from "./CenterMiddle";

export const Loading = ({ darkMode }: { darkMode: boolean }) => (
  <CenterMiddle style={{ minHeight: "50vh" }}>
    <Loader inverted={darkMode} active inline="centered" size="huge" />
  </CenterMiddle>
);

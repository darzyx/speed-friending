import { Loader } from "semantic-ui-react";

import CenterMiddle from "./CenterMiddle";

export const Loading = () => (
  <CenterMiddle style={{ minHeight: "50vh" }}>
    <Loader inverted active inline="centered" size="huge" />
  </CenterMiddle>
);

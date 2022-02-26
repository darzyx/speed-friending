import { Loader } from "semantic-ui-react";

import CenterMiddle from "./CenterMiddle";

export const Loading = ({ inverted }: { inverted: boolean }) => (
  <CenterMiddle style={{ minHeight: "50vh" }}>
    <Loader inverted={inverted} active inline="centered" size="huge" />
  </CenterMiddle>
);

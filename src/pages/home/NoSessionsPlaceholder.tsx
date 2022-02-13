import { Divider } from "semantic-ui-react";

const NoSessionsPlaceholder = () => (
  <div>
    <Divider hidden />
    <p style={{ textAlign: "center" }}>No sessions created yet! Stay tuned</p>
  </div>
);

export default NoSessionsPlaceholder;

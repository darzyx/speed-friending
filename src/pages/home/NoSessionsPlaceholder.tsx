import { Divider } from "semantic-ui-react";

const NoSessionsPlaceholder = () => (
  <div>
    <Divider hidden />
    <p style={{ textAlign: "center" }}>No sessions created yet! Stay tuned</p>
    <Divider hidden />
  </div>
);

export default NoSessionsPlaceholder;

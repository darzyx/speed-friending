import { Divider } from "semantic-ui-react";

const NoGroupsPlaceholder = () => (
  <div>
    <Divider hidden />
    <p style={{ textAlign: "center" }}>No groups created yet! Stay tuned</p>
    <Divider hidden />
  </div>
);

export default NoGroupsPlaceholder;

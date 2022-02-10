import { Button, Loader } from "semantic-ui-react";

// Not actually a link - just a loading placeholder for a session link
const LoadingSessionLink = () => {
  return (
    <Button style={{ width: "100%", maxWidth: "600px" }} size="large" secondary>
      <Loader active inline="centered" size="tiny" />
    </Button>
  );
};

export default LoadingSessionLink;

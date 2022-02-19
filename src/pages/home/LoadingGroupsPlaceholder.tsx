import { Button, Loader } from "semantic-ui-react";

const LoadingGroupsPlaceholder = () => {
  return (
    <Button
      style={{
        width: "100%",
        maxWidth: "600px",
        paddingTop: "15px",
        paddingBottom: "15px",
      }}
      size="large"
    >
      <Loader active inline="centered" size="tiny" />
    </Button>
  );
};

export default LoadingGroupsPlaceholder;

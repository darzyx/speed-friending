import { Button, Loader } from "semantic-ui-react";

const LoadingGroupsPlaceholder = () => {
  return (
    <Button
      style={{
        width: "100%",
        paddingTop: "15px",
        paddingBottom: "15px",
        backgroundColor: "#4b555d",
        color: "white",
      }}
      size="large"
    >
      <Loader inverted active inline="centered" size="tiny" />
    </Button>
  );
};

export default LoadingGroupsPlaceholder;

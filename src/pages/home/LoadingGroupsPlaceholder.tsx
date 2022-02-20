import { Button, Loader } from "semantic-ui-react";
import theme from "../../styles/theme";

const LoadingGroupsPlaceholder = () => {
  return (
    <Button
      style={{
        width: "100%",
        paddingTop: "15px",
        paddingBottom: "15px",
        backgroundColor: theme.color.four,
        color: theme.color.text,
      }}
      size="large"
    >
      <Loader inverted active inline="centered" size="tiny" />
    </Button>
  );
};

export default LoadingGroupsPlaceholder;

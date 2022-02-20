import { Button, Loader } from "semantic-ui-react";
import themeStyles from "../../styles/themeStyles";

const LoadingGroupsPlaceholder = () => {
  return (
    <Button
      style={{
        width: "100%",
        paddingTop: "15px",
        paddingBottom: "15px",
        backgroundColor: themeStyles.color.four,
        color: themeStyles.color.text,
      }}
      size="large"
    >
      <Loader inverted active inline="centered" size="tiny" />
    </Button>
  );
};

export default LoadingGroupsPlaceholder;

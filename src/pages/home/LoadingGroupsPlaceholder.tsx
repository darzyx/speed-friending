import { Button, Loader } from "semantic-ui-react";
import theme from "../../styles/theme";

const LoadingGroupsPlaceholder = ({ darkMode }: { darkMode: boolean }) => {
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
      <Loader inverted={darkMode} active inline="centered" size="tiny" />
    </Button>
  );
};

export default LoadingGroupsPlaceholder;

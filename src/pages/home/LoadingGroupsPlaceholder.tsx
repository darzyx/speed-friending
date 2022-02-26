import { Button, Loader } from "semantic-ui-react";
import styled from "styled-components";

const LoadingGroupsPlaceholderContainer = styled(Button).attrs({
  size: "large",
})`
  &&&& {
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
    background-color: ${({ theme }) => theme.color.four};
    color: ${({ theme }) => theme.color.text};
  }
`;

const LoadingGroupsPlaceholder = ({ inverted }: { inverted: boolean }) => {
  return (
    <LoadingGroupsPlaceholderContainer>
      <Loader inverted={inverted} active inline="centered" size="tiny" />
    </LoadingGroupsPlaceholderContainer>
  );
};

export default LoadingGroupsPlaceholder;

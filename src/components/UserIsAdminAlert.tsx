import styled, { keyframes } from "styled-components";
import theme from "../styles/theme";

const backgroundColorChange = keyframes`
  0% { background-color: ${theme.color.blue}; }
  33% { background-color: ${theme.color.purple}; }
  66% { background-color: ${theme.color.purple}; }
  100% { background-color: ${theme.color.pink}; }
`;

const StyledDiv = styled.div`
  visibility: ${({ userIsAdmin }: { userIsAdmin: boolean }) =>
    userIsAdmin ? "initial" : "hidden"};
  animation-name: ${backgroundColorChange};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
  padding: 3px 5px;
  color: ${({ theme }) => theme.color.one};
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
`;

const UserIsAdminAlert = ({ userIsAdmin }: { userIsAdmin: boolean }) => (
  <StyledDiv userIsAdmin={userIsAdmin}>Signed in as admin!</StyledDiv>
);

export default UserIsAdminAlert;

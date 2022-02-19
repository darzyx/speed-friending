import styled, { keyframes } from "styled-components";

const backgroundColorChange = keyframes`
  0% { background-color: #a84677; }
  25% { background-color: #009494; }
  50% { background-color: #6495ed; }
  100% { background-color: #9d4ebd; }
`;

const StyledDiv = styled.div`
  visibility: ${({ userIsAdmin }: { userIsAdmin: boolean }) =>
    userIsAdmin ? "initial" : "hidden"};
  animation-name: ${backgroundColorChange};
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
  padding: 3px 5px;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
`;

const UserIsAdminAlert = ({ userIsAdmin }: { userIsAdmin: boolean }) => (
  <StyledDiv userIsAdmin={userIsAdmin}>Signed in as admin!</StyledDiv>
);

export default UserIsAdminAlert;

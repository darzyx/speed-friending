import styled, { keyframes } from "styled-components";

const backgroundColorChange = keyframes`
  0% { background-color: #648FFF; }
  33% { background-color: #604AC5; }
  66% { background-color: #604AC5; }
  100% { background-color: #DC267F; }
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
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
`;

const UserIsAdminAlert = ({ userIsAdmin }: { userIsAdmin: boolean }) => (
  <StyledDiv userIsAdmin={userIsAdmin}>Signed in as admin!</StyledDiv>
);

export default UserIsAdminAlert;

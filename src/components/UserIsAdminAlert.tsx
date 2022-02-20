import styled, { keyframes } from "styled-components";

const backgroundColorChange = keyframes`
  0% { background-color: #773d5a; }
  25% { background-color: #00635e; }
  50% { background-color: #415f97; }
  100% { background-color: #713888; }
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

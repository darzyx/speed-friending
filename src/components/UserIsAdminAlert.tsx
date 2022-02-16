import styled, { keyframes } from "styled-components";

const backgroundColorChange = keyframes`
  0% { background-color: #a84677; }
  25% { background-color: #009494; }
  50% { background-color: #6495ed; }
  100% { background-color: #9d4ebd; }
`;

const StyledDiv = styled.div`
  animation-name: ${backgroundColorChange};
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
  padding: 3px 5px;
  color: black;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
`;

const UserIsAdminAlert = ({
  userIsAdmin,
  setUserIsAdmin,
}: {
  userIsAdmin: boolean;
  setUserIsAdmin: (userIsAdmin: boolean) => void;
}) => (
  <StyledDiv onClick={() => setUserIsAdmin(!userIsAdmin)}>
    TEST_MODE:{" "}
    {userIsAdmin ? "Signed in as admin!" : "Signed in as participant!"}
  </StyledDiv>
);

export default UserIsAdminAlert;

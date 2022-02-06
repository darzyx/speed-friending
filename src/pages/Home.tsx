import { DocumentData } from "firebase/firestore";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Icon, Loader, Segment } from "semantic-ui-react";

const maxSessions = 50;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`;

type HomePropsType = {
  isGettingSessions: boolean;
  hasAnySessions: boolean;
  sessions: DocumentData[];
  setOpenNewModal: (arg: boolean) => void;
};
const Home = ({
  isGettingSessions,
  hasAnySessions,
  sessions,
  setOpenNewModal,
}: HomePropsType) => {
  const disableNewSession = isGettingSessions || sessions.length >= maxSessions;
  return (
    <HomeContainer>
      <h1>✨ Speed Friending 🏕️</h1>
      <h3>Ongoing Sessions</h3>
      {hasAnySessions &&
        sessions.map((session) => (
          <Segment
            inverted
            raised
            as={Link}
            to={`/session/${session.id}`}
            key={session.id}
            style={{ width: "100%", maxWidth: "600px" }}
            textAlign="center"
          >
            {session.name}
          </Segment>
        ))}
      <Segment
        inverted
        raised
        style={{ width: "100%", maxWidth: "600px", cursor: "pointer" }}
        textAlign="center"
        onClick={disableNewSession ? null : () => setOpenNewModal(true)}
        disabled={disableNewSession}
      >
        {isGettingSessions ? (
          <Loader active inline="centered" size="tiny" />
        ) : (
          <>
            {sessions.length >= maxSessions ? (
              <Icon name="close" />
            ) : (
              <Icon name="plus" />
            )}
          </>
        )}
      </Segment>
    </HomeContainer>
  );
};

export default Home;

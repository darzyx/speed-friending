import { DocumentData } from "firebase/firestore";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Icon, Loader, Segment } from "semantic-ui-react";

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
        onClick={isGettingSessions ? null : () => setOpenNewModal(true)}
        disabled={isGettingSessions}
      >
        {isGettingSessions ? (
          <Loader active inline="centered" size="tiny" />
        ) : (
          <>
            <Icon name="plus" />
          </>
        )}
      </Segment>
    </HomeContainer>
  );
};

export default Home;

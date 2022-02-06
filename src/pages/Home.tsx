import { DocumentData } from "firebase/firestore";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Segment } from "semantic-ui-react";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`;

type HomePropsType = { sessions: DocumentData[] };
const Home = ({ sessions }: HomePropsType) => {
  const hasSessions = Array.isArray(sessions) && sessions[0]?.name?.length > 0;
  return (
    <HomeContainer>
      <h1>Speed Friending</h1>
      <h3>Ongoing Sessions</h3>
      {hasSessions ? (
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
        ))
      ) : (
        <p>Loading...</p>
      )}
    </HomeContainer>
  );
};

export default Home;

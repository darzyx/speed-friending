import { DocumentData } from "firebase/firestore";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const Home = ({ sessions }: { sessions: DocumentData[] }) => {
  const hasSessions =
    Array.isArray(sessions) &&
    sessions.length > 0 &&
    sessions[0].name &&
    typeof sessions[0].name === "string";
  return (
    <HomeContainer>
      <h1>Speed Vibing</h1>
      <h3>Ongoing Sessions</h3>
      {hasSessions ? (
        sessions.map((session, index) => (
          <Link to={`/session/${session.id}`} key={index}>
            {session.name}
          </Link>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </HomeContainer>
  );
};

export default Home;

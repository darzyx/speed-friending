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

const Home = () => {
  return (
    <HomeContainer>
      <h1>Speed Vibing</h1>
      <h3>Ongoing Sessions</h3>
      <Link to="/session">Session A</Link>
      <Link to="/session">Session B</Link>
      <Link to="/session">Session C</Link>
    </HomeContainer>
  );
};

export default Home;

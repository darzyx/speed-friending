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
      <h2>Create New Session</h2>
      <h2>Ongoing Sessions</h2>
    </HomeContainer>
  );
};

export default Home;

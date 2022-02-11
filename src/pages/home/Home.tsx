import { useState } from "react";
import styled from "styled-components";
import { Location, useLocation } from "react-router-dom";

import SessionLink from "./SessionLink";
import LoadingSessionLink from "./LoadingSessionLink";
import CreateSessionLink from "./CreateSessionLink";
import { centerMiddleCSS } from "../../components/blocks/CenterMiddle";
import { SessionWithIdType } from "../../types/session";
import NewModal from "./NewModal";
import { Header } from "semantic-ui-react";

const HomeContainer = styled.div`
  ${centerMiddleCSS}
  margin: 0;
  padding: 0;
`;

type HomePropsType = {
  isGettingSessions: boolean;
  hasAnySessions: boolean;
  sessions: SessionWithIdType[];
  currentTimeInSeconds: number;
};
const Home = ({
  isGettingSessions,
  hasAnySessions,
  sessions,
  currentTimeInSeconds,
}: HomePropsType) => {
  const location: Location = useLocation();

  const [openNewModal, setOpenNewModal] = useState(false);

  return (
    <HomeContainer>
      <Header as="h1" inverted textAlign="center">
        <Header.Subheader>Home</Header.Subheader> ✨ Speed Friending 🏕️
      </Header>
      <Header as="h3" inverted textAlign="center" style={{ color: "teal" }}>
        Select Your Session Below
      </Header>
      {hasAnySessions &&
        sessions.map((session, index) => (
          <SessionLink
            key={session.id}
            index={index}
            session={session}
            currentTimeInSeconds={currentTimeInSeconds}
          />
        ))}
      {!hasAnySessions && isGettingSessions && <LoadingSessionLink />}
      {!isGettingSessions && (
        <CreateSessionLink
          sessions={sessions}
          hasAnySessions={hasAnySessions}
          setOpenNewModal={setOpenNewModal}
        />
      )}
      <NewModal
        openNewModal={openNewModal}
        setOpenNewModal={setOpenNewModal}
        location={location}
      />
    </HomeContainer>
  );
};

export default Home;

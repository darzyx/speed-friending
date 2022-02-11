import { useState } from "react";
import styled from "styled-components";
import { Location, useLocation } from "react-router-dom";

import SessionLink from "./SessionLink";
import LoadingSessionLink from "./LoadingSessionLink";
import CreateSessionLink from "./CreateSessionLink";
import { centerMiddleCSS } from "../../components/blocks/CenterMiddle";
import { SessionWithIdType } from "../../types/session";
import NewModal from "./NewModal";

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
      <h1>✨ Speed Friending 🏕️</h1>
      <h3>Ongoing Sessions</h3>
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
import { useState } from "react";
import styled from "styled-components";

import SessionLink from "./SessionLink";
import LoadingSessionsPlaceholder from "./LoadingSessionsPlaceholder";
import CreateSessionModalTrigger from "./CreateSessionModalTrigger";
import NoSessionsPlaceholder from "./NoSessionsPlaceholder";
import { centerMiddleCSS } from "../../components/blocks/CenterMiddle";
import { SessionWithIdType } from "../../types/session";
import CreateSessionModal from "./CreateSessionModal";
import { Header } from "semantic-ui-react";
import { ColorfulHeader } from "../../components/blocks/ColorfulText";

const HomeContainer = styled.div`
  ${centerMiddleCSS}
  margin: 0;
  padding: 0;
`;

type HomePropsType = {
  userIsAdmin: boolean;
  isGettingSessions: boolean;
  hasAnySessions: boolean;
  sessions: SessionWithIdType[];
  currentTimeInSeconds: number;
};
const Home = ({
  userIsAdmin,
  isGettingSessions,
  hasAnySessions,
  sessions,
  currentTimeInSeconds,
}: HomePropsType) => {
  const [openCreateSessionModal, setOpenCreateSessionModal] = useState(false);

  return (
    <HomeContainer>
      <Header as="h1" inverted textAlign="center">
        <Header.Subheader style={{ margin: "7px" }}>Home</Header.Subheader> ✨
        Speed Friending 🏕️
      </Header>
      <ColorfulHeader as="h3">Select Your Session Below</ColorfulHeader>
      {hasAnySessions &&
        sessions.map((session, index) => (
          <SessionLink
            userIsAdmin={userIsAdmin}
            currentTimeInSeconds={currentTimeInSeconds}
            session={session}
            key={session.id}
            index={index}
          />
        ))}
      {!hasAnySessions && isGettingSessions && <LoadingSessionsPlaceholder />}
      {!hasAnySessions && !isGettingSessions && <NoSessionsPlaceholder />}
      {userIsAdmin && !isGettingSessions && (
        <CreateSessionModalTrigger
          sessions={sessions}
          hasAnySessions={hasAnySessions}
          setOpenCreateSessionModal={setOpenCreateSessionModal}
        />
      )}
      <CreateSessionModal
        openCreateSessionModal={openCreateSessionModal}
        setOpenCreateSessionModal={setOpenCreateSessionModal}
      />
    </HomeContainer>
  );
};

export default Home;

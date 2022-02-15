import { useState } from "react";
import styled from "styled-components";

import SessionLink from "./SessionLink";
import LoadingSessionsPlaceholder from "./LoadingSessionsPlaceholder";
import CreateSessionButton from "./CreateSessionButton";
import NoSessionsPlaceholder from "./NoSessionsPlaceholder";
import { centerMiddleCSS } from "../../components/blocks/CenterMiddle";
import { SessionWithIdType } from "../../types/session";
import NewModal from "./NewModal";
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
  const [openNewModal, setOpenNewModal] = useState(false);

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
        <CreateSessionButton
          sessions={sessions}
          hasAnySessions={hasAnySessions}
          setOpenNewModal={setOpenNewModal}
        />
      )}
      <NewModal openNewModal={openNewModal} setOpenNewModal={setOpenNewModal} />
    </HomeContainer>
  );
};

export default Home;

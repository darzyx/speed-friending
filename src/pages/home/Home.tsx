import styled from "styled-components";

import SessionLink from "./SessionLink";
import LoadingSessionLink from "./LoadingSessionLink";
import CreateSessionLink from "./CreateSessionLink";
import { centerMiddleCSS } from "../../components/blocks/CenterMiddle";
import { SessionWithIdType } from "../../types/session";

const HomeContainer = styled.div`
  ${centerMiddleCSS}
  margin: 0;
  padding: 0;
`;

type HomePropsType = {
  isGettingSessions: boolean;
  hasAnySessions: boolean;
  sessions: SessionWithIdType[];
  setOpenNewModal: (arg: boolean) => void;
  currentTimeInSeconds: number;
};
const Home = ({
  isGettingSessions,
  hasAnySessions,
  sessions,
  setOpenNewModal,
  currentTimeInSeconds,
}: HomePropsType) => (
  <HomeContainer>
    <h1>✨ Speed Friending 🏕️</h1>
    <h3>Ongoing Sessions</h3>
    {hasAnySessions &&
      sessions.map((session, index) => (
        <SessionLink
          index={index}
          session={session}
          currentTimeInSeconds={currentTimeInSeconds}
        />
      ))}
    {!hasAnySessions && isGettingSessions && <LoadingSessionLink />}
    <CreateSessionLink
      sessions={sessions}
      hasAnySessions={hasAnySessions}
      setOpenNewModal={setOpenNewModal}
      isGettingSessions={isGettingSessions}
    />
  </HomeContainer>
);

export default Home;

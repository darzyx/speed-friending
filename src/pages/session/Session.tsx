import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Dimmer, Header, Loader } from "semantic-ui-react";

import Participant from "./Participant";
import { getGame, RoundType } from "./utils";
import { SessionWithIdType } from "../../types/session";
import { initSession } from "../../App";
import SessionHeading from "./SessionHeading";
import styled from "styled-components";

const ParticipantsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  grid-gap: 8px;
`;
const Participants = ({ activeRound }: { activeRound: RoundType }) => (
  <ParticipantsContainer>
    {activeRound.top.map((nTop, idxTop) => (
      <div>
        <Participant key={nTop} n={nTop} top={true} />
        <Participant
          key={activeRound.btm[idxTop]}
          n={activeRound.btm[idxTop]}
          top={false}
        />
      </div>
    ))}
  </ParticipantsContainer>
);

type SessionPropsType = {
  sessions: SessionWithIdType[];
  isGettingSessions: boolean;
  currentTimeInSeconds: number;
  userIsAdmin: boolean;
};
const Session = ({
  sessions,
  isGettingSessions,
  currentTimeInSeconds,
  userIsAdmin,
}: SessionPropsType) => {
  const { id } = useParams();

  const [session, setSession] = useState(initSession);
  const hasSession = session?.name?.length > 0;
  useEffect(() => {
    const foundSession = sessions.find((s) => s.id === id);
    if (foundSession) {
      setSession(foundSession);
    }
  }, [id, sessions]);

  const [
    activePage,
    // setSelectedPage
  ] = useState("1");

  if (isGettingSessions || !hasSession) {
    return (
      <Dimmer active>
        <Loader size="big">Loading...</Loader>
      </Dimmer>
    );
  }

  const game = getGame(session.participant_count, session.total_rounds);
  const activeRound = Object.values(game)[Number(activePage) - 1];

  return (
    <div>
      <SessionHeading
        session={session}
        currentTimeInSeconds={currentTimeInSeconds}
        userIsAdmin={userIsAdmin}
      />
      <Header as="h3" inverted textAlign="center">
        {`Round ${activePage}`}
      </Header>
      <Participants activeRound={activeRound} />
    </div>
  );
};

export default Session;

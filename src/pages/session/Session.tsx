import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Dimmer, Divider, Header, Loader } from "semantic-ui-react";

import Participant from "./Participant";
import { getGame, RoundType } from "./utils";
import { SessionWithIdType } from "../../types/session";
import { initSession } from "../../App";
import SessionHeading from "./SessionHeading";
import StyledPagination from "./StyledPagination";
import styled from "styled-components";

const ParticipantsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(55px, 1fr));
  grid-gap: 8px;
`;
const Participants = ({
  selectedRound,
  selectedRoundIsActive,
}: {
  selectedRound: RoundType;
  selectedRoundIsActive: boolean;
}) => (
  <ParticipantsContainer>
    {selectedRound.top.map((nTop, idxTop) => (
      <div>
        <Participant
          key={nTop}
          n={nTop}
          selectedRoundIsActive={selectedRoundIsActive}
          top={true}
        />
        <Participant
          key={selectedRound.btm[idxTop]}
          n={selectedRound.btm[idxTop]}
          selectedRoundIsActive={selectedRoundIsActive}
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

  const [selectedPage, setSelectedPage] = useState("1");

  if (isGettingSessions || !hasSession) {
    return (
      <Dimmer active>
        <Loader size="big">Loading...</Loader>
      </Dimmer>
    );
  }

  const game = getGame(session.participant_count, session.total_rounds);
  const selectedRound = Object.values(game)[Number(selectedPage) - 1];
  const selectedRoundIsActive = session?.active_round === Number(selectedPage);

  return (
    <div>
      <SessionHeading
        session={session}
        currentTimeInSeconds={currentTimeInSeconds}
        userIsAdmin={userIsAdmin}
      />
      <Header as="h3" inverted textAlign="center" style={{ color: "teal" }}>
        {`Round ${selectedPage} (${
          selectedRoundIsActive ? "active" : "inactive"
        })`}
      </Header>
      <Participants
        selectedRound={selectedRound}
        selectedRoundIsActive={selectedRoundIsActive}
      />
      <Divider hidden />
      <StyledPagination
        session={session}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        selectedRoundIsActive={selectedRoundIsActive}
      />
    </div>
  );
};

export default Session;

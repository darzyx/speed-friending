import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Dimmer, Divider, Header, Loader } from "semantic-ui-react";

import ParticipantPosition from "./ParticipantPosition";
import { getGame } from "./utils";
import { SessionWithIdType } from "../../types/session";
import { initSession } from "../../App";
import SessionHeading from "./SessionHeading";
import StyledPagination from "./StyledPagination";

const ParticipantPositionRow = ({
  row,
  selectedRoundIsActive,
  top,
}: {
  row: number[];
  selectedRoundIsActive: boolean;
  top: boolean;
}) => (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    {row.map((n, rowIndex) => (
      <ParticipantPosition
        key={rowIndex}
        n={n}
        selectedRoundIsActive={selectedRoundIsActive}
        top={top}
      />
    ))}
  </div>
);

type SessionPropsType = {
  sessions: SessionWithIdType[];
  isGettingSessions: boolean;
  currentTimeInSeconds: number;
};
const Session = ({
  sessions,
  isGettingSessions,
  currentTimeInSeconds,
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
      />
      <Header as="h3" inverted textAlign="center">
        {`Round ${selectedPage} (${
          selectedRoundIsActive ? "active" : "inactive"
        })`}
      </Header>
      <ParticipantPositionRow
        row={selectedRound.top.slice(0, selectedRound.top.length / 2)}
        selectedRoundIsActive={selectedRoundIsActive}
        top={true}
      />
      <ParticipantPositionRow
        row={selectedRound.btm.slice(0, selectedRound.top.length / 2)}
        selectedRoundIsActive={selectedRoundIsActive}
        top={false}
      />
      <Divider hidden />
      <ParticipantPositionRow
        row={selectedRound.top.slice(
          selectedRound.top.length / 2,
          selectedRound.top.length
        )}
        selectedRoundIsActive={selectedRoundIsActive}
        top={true}
      />
      <ParticipantPositionRow
        row={selectedRound.btm.slice(
          selectedRound.btm.length / 2,
          selectedRound.btm.length
        )}
        selectedRoundIsActive={selectedRoundIsActive}
        top={false}
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

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Divider, Pagination } from "semantic-ui-react";
import styled from "styled-components";

import ParticipantPosition from "./ParticipantPosition";
import { getGame } from "./utils";
import { SessionWithIdType } from "../../types/session";
import { initSession } from "../../App";

const StyledPagination = styled(Pagination)`
  &&&& {
    * {
      color: white !important;
    }
  }
`;

const ParticipantPositionRow = ({
  row,
  session,
  selectedPage,
  top,
}: {
  row: number[];
  session: SessionWithIdType;
  selectedPage: string;
  top: boolean;
}) => (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    {row.map((n, rowIndex) => (
      <ParticipantPosition
        key={rowIndex}
        n={n}
        round={Number(selectedPage)}
        activeRound={session.active_round}
        top={top}
      />
    ))}
  </div>
);

type SessionPropsType = { sessions: SessionWithIdType[] };
const Session = ({ sessions }: SessionPropsType) => {
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
  const handlePageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { activePage }: { activePage: string }
  ) => {
    setSelectedPage(activePage);
  };

  if (!hasSession) {
    return <p>Loading...</p>;
  }

  const game = getGame(session.participant_count, session.total_rounds);
  const selectedRound = Object.values(game)[Number(selectedPage) - 1];

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ marginBottom: "0" }}>{session.name}</h1>
        <h3 style={{ marginTop: "0", marginBottom: "0", color: "#a9a9a9" }}>
          {`${session.participant_count} participants`}
        </h3>
        <h3 style={{ marginTop: "0", color: "#a9a9a9" }}>
          {`${session.total_rounds} rounds`}
        </h3>
        <button
          style={{
            padding: "8px 12px",
            fontWeight: "bold",
            borderRadius: "8px",
            textTransform: "uppercase",
            backgroundColor: "#a9a9a9",
            cursor: "pointer",
          }}
        >
          Click to Enter Number
        </button>
      </div>
      <div style={{ margin: "20px" }}>
        <h2 style={{ marginBottom: "5px" }}>{`Round ${selectedPage}`}</h2>
        <ParticipantPositionRow
          row={selectedRound.top.slice(0, selectedRound.top.length / 2)}
          session={session}
          selectedPage={selectedPage}
          top={true}
        />
        <ParticipantPositionRow
          row={selectedRound.btm.slice(0, selectedRound.top.length / 2)}
          session={session}
          selectedPage={selectedPage}
          top={false}
        />
        <Divider hidden />
        <ParticipantPositionRow
          row={selectedRound.top.slice(
            selectedRound.top.length / 2,
            selectedRound.top.length
          )}
          session={session}
          selectedPage={selectedPage}
          top={true}
        />
        <ParticipantPositionRow
          row={selectedRound.btm.slice(
            selectedRound.btm.length / 2,
            selectedRound.btm.length
          )}
          session={session}
          selectedPage={selectedPage}
          top={false}
        />
        <Divider hidden />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StyledPagination
          activePage={selectedPage}
          onPageChange={handlePageChange}
          totalPages={session.total_rounds}
          pointing
          secondary
        />
      </div>
    </div>
  );
};

export default Session;

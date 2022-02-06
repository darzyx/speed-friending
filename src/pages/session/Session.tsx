import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ParticipantPosition from "./ParticipantPosition";
import { getGame } from "./utils";
import { SessionWithIdType } from "../../types/session";
import { initSession } from "../../App";
import { Divider } from "semantic-ui-react";

const ParticipantPositionRow = ({
  row,
  session,
  index,
}: {
  row: number[];
  session: SessionWithIdType;
  index: number;
}) => (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    {row.map((n, rowIndex) => (
      <ParticipantPosition
        key={rowIndex}
        n={n}
        round={index + 1}
        currentRound={session.current_round}
        top
      />
    ))}
  </div>
);

type SessionPropsType = { sessions: SessionWithIdType[] };
const Session = ({ sessions }: SessionPropsType) => {
  const { id } = useParams();

  const [session, setSession] = useState(initSession);
  useEffect(() => {
    const foundSession = sessions.find((s) => s.id === id);
    if (foundSession) {
      setSession(foundSession);
    }
  }, [id, sessions]);

  const hasSession = session?.name?.length > 0;

  const game = getGame(session.total_participants, session.total_rounds);

  if (!hasSession) {
    return <p>Loading...</p>;
  }

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
        <h3 style={{ marginTop: "0", color: "#a9a9a9" }}>
          {`${session.total_participants} participants`}
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
      {Object.values(game).map((round, index) => {
        return (
          <div style={{ margin: "20px" }} key={index}>
            <h2 style={{ marginBottom: "5px" }}>{`Round ${index + 1}`}</h2>
            <ParticipantPositionRow
              row={round.top.slice(0, round.top.length / 2)}
              session={session}
              index={index}
            />
            <ParticipantPositionRow
              row={round.btm.slice(0, round.top.length / 2)}
              session={session}
              index={index}
            />
            <Divider hidden />
            <ParticipantPositionRow
              row={round.top.slice(round.top.length / 2, round.top.length)}
              session={session}
              index={index}
            />
            <ParticipantPositionRow
              row={round.btm.slice(round.btm.length / 2, round.btm.length)}
              session={session}
              index={index}
            />
            <Divider hidden />
          </div>
        );
      })}
    </div>
  );
};

export default Session;

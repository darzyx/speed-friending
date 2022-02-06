import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ParticipantPosition from "./ParticipantPosition";
import { getGame } from "./utils";
import { SessionType } from "../../types/session";

type SessionPropsType = { sessions: SessionType[] };

const initSession = {
  id: "",
  name: "",
  total_participants: 0,
  current_round: 0,
  total_rounds: 0,
};

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

  if (hasSession) console.log({ session });

  const [
    nParticipants,
    // setNParticipants
  ] = useState(15);
  const [
    maxRounds,
    // setMaxRounds
  ] = useState(10);
  const [activeRound, setActiveRound] = useState(1);
  const game = getGame(nParticipants, maxRounds);

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
        <h1 style={{ marginBottom: "0" }}>Session A</h1>
        <h3 style={{ marginTop: "0", color: "#a9a9a9" }}>
          {`${nParticipants} participants`}
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
          <div
            style={{ margin: "20px" }}
            key={index}
            onClick={() => setActiveRound(index + 1)}
          >
            <h2 style={{ marginBottom: "5px" }}>{`Round ${index + 1}`}</h2>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {round.top.map((n, topIdx) => (
                <ParticipantPosition
                  key={topIdx}
                  n={n}
                  round={index + 1}
                  activeRound={activeRound}
                  top
                />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {round.btm.map((n, btmIdx) => (
                <ParticipantPosition
                  key={btmIdx}
                  round={index + 1}
                  activeRound={activeRound}
                  n={n}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Session;

import React from "react";

import { getColor } from "./utils";

type ParticipantPositionPropsType = {
  n: number;
  round: number;
  activeRound: number;
  top?: boolean;
};

const ParticipantPosition = ({
  n,
  round,
  activeRound,
  top,
}: ParticipantPositionPropsType) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      minHeight: "50px",
      width: "100%",
      color: "black",
      fontWeight: "bold",
      fontSize: "20px",
      backgroundColor: round === activeRound ? getColor(n) : "#222",
      border: "2px solid black",
      borderRadius: top ? "8px 8px 0 0" : "0 0 8px 8px",
      boxSizing: "border-box",
    }}
  >
    {n}
  </div>
);

export default ParticipantPosition;

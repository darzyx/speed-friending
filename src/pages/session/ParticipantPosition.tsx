import React from "react";

import { getColor } from "./utils";

type ParticipantPositionPropsType = {
  n: number;
  selectedRoundIsActive: boolean;
  top?: boolean;
};
const ParticipantPosition = ({
  n,
  selectedRoundIsActive,
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
      color: selectedRoundIsActive ? "black" : "white",
      fontWeight: "bold",
      fontSize: "22px",
      backgroundColor: selectedRoundIsActive ? getColor(n) : "#1b1c1d",
      border: "2px solid black",
      borderRadius: top ? "8px 8px 0 0" : "0 0 8px 8px",
      boxSizing: "border-box",
    }}
  >
    {n}
  </div>
);

export default ParticipantPosition;

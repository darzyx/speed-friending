import React from "react";
import CenterMiddle from "../../components/blocks/CenterMiddle";

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
  <CenterMiddle
    style={{
      height: "100%",
      minHeight: "50px",
      width: "100%",
      color: "white",
      fontWeight: "bold",
      fontSize: "22px",
      backgroundColor: "#1b1c1d",
      border: "2px solid black",
      borderRadius: top ? "8px 8px 0 0" : "0 0 8px 8px",
      boxSizing: "border-box",
      ...(selectedRoundIsActive && {
        backgroundColor: getColor(n),
        color: "black",
      }),
    }}
  >
    {n}
  </CenterMiddle>
);

export default ParticipantPosition;

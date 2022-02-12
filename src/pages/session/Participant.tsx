import CenterMiddle from "../../components/blocks/CenterMiddle";

import { getParticipantColor } from "./utils";

type ParticipantPropsType = {
  n: number;
  selectedRoundIsActive: boolean;
  top?: boolean;
};
const Participant = ({
  n,
  selectedRoundIsActive,
  top,
}: ParticipantPropsType) => (
  <CenterMiddle
    style={{
      height: "100%",
      minHeight: "50px",
      width: "100%",
      margin: "0 5px 5px 5px",
      color: "white",
      fontWeight: "bold",
      fontSize: "22px",
      backgroundColor: "#1b1c1d",
      boxShadow: "2px 2px 6px 0px  rgba(0,0,0,0.3)",
      borderRadius: "0 0 5px 5px",
      boxSizing: "border-box",
      ...(selectedRoundIsActive && {
        backgroundColor: getParticipantColor(n),
        color: "black",
      }),
      ...(top && {
        borderRadius: "5px 5px 0 0",
        margin: "5px 5px 0 5px",
      }),
    }}
  >
    {n}
  </CenterMiddle>
);

export default Participant;

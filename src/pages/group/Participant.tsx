import CenterMiddle from "../../components/blocks/CenterMiddle";

import { getParticipantColor } from "./utils";

type ParticipantPropsType = { n: number; top?: boolean };
const Participant = ({ n, top }: ParticipantPropsType) => (
  <CenterMiddle
    style={{
      height: "50px",
      margin: "0",
      fontWeight: "bold",
      fontSize: "22px",
      color: "#181a1b",
      backgroundColor: getParticipantColor(n),
      boxShadow: "2px 2px 6px 0px  rgba(0,0,0,0.3)",
      borderRadius: "0 0 5px 5px",
      boxSizing: "border-box",
      ...(top && { borderRadius: "5px 5px 0 0" }),
    }}
  >
    {n === 0 ? "X" : n}
  </CenterMiddle>
);

export default Participant;

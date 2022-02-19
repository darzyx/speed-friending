import { Icon } from "semantic-ui-react";

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
      borderRadius: "0 0 5px 5px",
      boxSizing: "border-box",
      ...(n === 0 && { color: "white", backgroundColor: "#181a1b" }),
      ...(top && { borderRadius: "5px 5px 0 0" }),
    }}
  >
    {n === 0 ? <Icon name="remove" style={{ margin: "0" }} /> : n}
  </CenterMiddle>
);

export default Participant;

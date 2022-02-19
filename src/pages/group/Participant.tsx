import CenterMiddle from "../../components/blocks/CenterMiddle";
import { getParticipantColor } from "./utils";

type ParticipantPropsType = {
  n: number;
  top?: boolean;
  onClickParticipant?: (n: number) => void;
  dropouts: number[];
};
const Participant = ({
  n,
  top,
  onClickParticipant,
  dropouts,
}: ParticipantPropsType) => {
  const isX = n === 0 || dropouts.includes(n);
  return (
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
        cursor: "pointer",
        ...(isX && { color: "white", backgroundColor: "#181a1b" }),
        ...(top && { borderRadius: "5px 5px 0 0" }),
      }}
      {...(onClickParticipant && { onClick: () => onClickParticipant(n) })}
    >
      {isX ? "X" : n}
    </CenterMiddle>
  );
};

export default Participant;

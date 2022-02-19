import CenterMiddle from "../../components/blocks/CenterMiddle";
import { getParticipantColor } from "./utils";

type ParticipantPropsType = {
  n: number;
  top?: boolean;
  onClickParticipant?: (n: number) => void;
  dropouts: number[];
  currentTimeInSeconds: number;
};
const Participant = ({
  n,
  top,
  dropouts,
  onClickParticipant,
  currentTimeInSeconds,
}: ParticipantPropsType) => {
  const hide =
    n === 0 || (dropouts.includes(n) && currentTimeInSeconds % 2 === 0);

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
        ...(onClickParticipant && { cursor: "pointer" }),
        ...(hide && { color: "white", backgroundColor: "#181a1b" }),
        ...(top && { borderRadius: "5px 5px 0 0" }),
      }}
      {...(onClickParticipant && { onClick: () => onClickParticipant(n) })}
    >
      {hide ? "X" : n}
    </CenterMiddle>
  );
};

export default Participant;

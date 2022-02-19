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
  const oddTime = currentTimeInSeconds % 2 === 0;
  const hiddenMode = n === 0 || (dropouts.includes(n) && oddTime);

  return (
    <CenterMiddle
      style={{
        height: "50px",
        margin: "0",
        fontWeight: "bold",
        fontSize: "22px",
        borderRadius: "0 0 5px 5px",
        boxSizing: "border-box",
        color: "#181a1b",
        backgroundColor: getParticipantColor(n),
        ...(onClickParticipant && { cursor: "pointer" }),
        ...(hiddenMode && { color: "white", backgroundColor: "#181a1b" }),
        ...(top && { borderRadius: "5px 5px 0 0" }),
      }}
      {...(onClickParticipant && { onClick: () => onClickParticipant(n) })}
    >
      {hiddenMode ? "X" : n}
    </CenterMiddle>
  );
};

export default Participant;

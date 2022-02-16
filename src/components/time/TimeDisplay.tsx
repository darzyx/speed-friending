import { SemanticCOLORS, Statistic } from "semantic-ui-react";
import { SessionWithIdType } from "../../types/session";
import CenterMiddle from "../blocks/CenterMiddle";

type TimeDisplayPropsType = {
  userIsAdmin: boolean;
  session: SessionWithIdType;
  timeValues: {
    color: SemanticCOLORS;
    remainingMinutes: string;
    remainingSeconds: string;
  };
  setOpenTimeModal: (arg: boolean) => void;
};
const TimeDisplay = ({
  userIsAdmin,
  session,
  timeValues,
  setOpenTimeModal,
}: TimeDisplayPropsType) => (
  <CenterMiddle>
    <Statistic
      inverted
      {...(userIsAdmin
        ? {
            color: timeValues.color,
            onClick: () => setOpenTimeModal(true),
            style: { cursor: "pointer" },
          }
        : { color: timeValues.color })}
    >
      <Statistic.Value style={{ fontFamily: "'Orbitron', sans-serif" }}>
        {`${timeValues.remainingMinutes}:${timeValues.remainingSeconds}`}
      </Statistic.Value>
      <Statistic.Label>{`Round ${session.round_active}`}</Statistic.Label>
    </Statistic>
  </CenterMiddle>
);

export default TimeDisplay;

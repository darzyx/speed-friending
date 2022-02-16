import { Statistic } from "semantic-ui-react";
import { TimeValuesType } from "../../pages/session/utils";
import { SessionWithIdType } from "../../types/session";
import CenterMiddle from "../blocks/CenterMiddle";

type TimeDisplayPropsType = {
  userIsAdmin: boolean;
  session: SessionWithIdType;
  timeValues: TimeValuesType;
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
        {`${timeValues.remainingMinutesDisplay}:${timeValues.remainingSecondsDisplay}`}
      </Statistic.Value>
      <Statistic.Label>{`Round ${session.round_active}`}</Statistic.Label>
    </Statistic>
  </CenterMiddle>
);

export default TimeDisplay;

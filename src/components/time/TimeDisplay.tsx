import { Statistic } from "semantic-ui-react";
import { TimeValuesType } from "../../pages/group/utils";
import { GroupWithIdType } from "../../types/group";
import CenterMiddle from "../blocks/CenterMiddle";

type TimeDisplayPropsType = {
  userIsAdmin: boolean;
  group: GroupWithIdType;
  timeValues: TimeValuesType;
  setOpenTimeModal: (arg: boolean) => void;
};
const TimeDisplay = ({
  userIsAdmin,
  group,
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
      <Statistic.Label>{`Round ${group.round_active}`}</Statistic.Label>
    </Statistic>
  </CenterMiddle>
);

export default TimeDisplay;

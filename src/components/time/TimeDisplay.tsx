import { Statistic } from "semantic-ui-react";
import { TimeValuesType } from "../../pages/group/utils";
import { GroupWithIdType } from "../../types/group";
import CenterMiddle from "../blocks/CenterMiddle";

type TimeDisplayPropsType = {
  group: GroupWithIdType;
  timeValues: TimeValuesType;
};
const TimeDisplay = ({ group, timeValues }: TimeDisplayPropsType) => (
  <CenterMiddle>
    <Statistic color={timeValues.color}>
      <Statistic.Value
        style={{ fontFamily: "'Orbitron', sans-serif", userSelect: "none" }}
      >
        {`${timeValues.remainingMinutesDisplay}:${timeValues.remainingSecondsDisplay}`}
      </Statistic.Value>
      <Statistic.Label>{`Round ${group.round_active}`}</Statistic.Label>
    </Statistic>
  </CenterMiddle>
);

export default TimeDisplay;

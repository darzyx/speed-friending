import { Statistic } from "semantic-ui-react";
import { TimeValuesType } from "../../pages/group/utils";
import { groupWithIdType } from "../../types/group";
import CenterMiddle from "../blocks/CenterMiddle";

type TimeDisplayPropsType = {
  group: groupWithIdType;
  timeValues: TimeValuesType;
};
const TimeDisplay = ({ group, timeValues }: TimeDisplayPropsType) => (
  <CenterMiddle>
    <Statistic inverted color={timeValues.color}>
      <Statistic.Value
        style={{ fontFamily: "'Orbitron', sans-serif", userSelect: "none" }}
      >
        {`${timeValues.remainingMinutesDisplay}:${timeValues.remainingSecondsDisplay}`}
      </Statistic.Value>
      <Statistic.Label>
        {`Round ${group.active_round_num}/${group.round_count}`}
      </Statistic.Label>
    </Statistic>
  </CenterMiddle>
);

export default TimeDisplay;

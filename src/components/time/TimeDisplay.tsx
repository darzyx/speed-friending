import { Statistic } from "semantic-ui-react";
import { TimeValuesType } from "../../pages/group/utils";
import { groupWithIdType } from "../../types/group";
import CenterMiddle from "../blocks/CenterMiddle";

type TimeDisplayPropsType = {
  group: groupWithIdType;
  timeValues: TimeValuesType;
  darkMode: boolean;
};
const TimeDisplay = ({ group, timeValues, darkMode }: TimeDisplayPropsType) => (
  <CenterMiddle>
    <Statistic inverted={darkMode} color={timeValues.color}>
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

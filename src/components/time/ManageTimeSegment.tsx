import { Divider, Segment } from "semantic-ui-react";
import { TimeValuesType } from "../../pages/group/utils";
import { GroupWithIdType } from "../../types/group";

import CenterMiddle from "../blocks/CenterMiddle";
import TimeDisplay from "./TimeDisplay";
import TimeDisplayControls from "./TimeDisplayControls";

type ManageTimeSegmentPropsType = {
  group: GroupWithIdType;
  timeValues: TimeValuesType;
};
const ManageTimeSegment = ({
  group,
  timeValues,
}: ManageTimeSegmentPropsType) => (
  <CenterMiddle>
    <Segment inverted style={{ backgroundColor: "#27292a" }}>
      <TimeDisplay timeValues={timeValues} group={group} />
      <Divider hidden />
      <TimeDisplayControls group={group} timeValues={timeValues} />
    </Segment>
  </CenterMiddle>
);

export default ManageTimeSegment;

import StyledModal from "../blocks/StyledModal";
import { GroupWithIdType } from "../../types/group";
import TimeDisplay from "./TimeDisplay";
import { TimeValuesType } from "../../pages/group/utils";
import TimeDisplayControls from "./TimeDisplayControls";

type ManageTimeModalPropsType = {
  group: GroupWithIdType;
  timeValues: TimeValuesType;
  openTimeModal: boolean;
  setOpenTimeModal: (openTimeModal: boolean) => void;
};
const ManageTimeModal = ({
  group,
  timeValues,
  openTimeModal,
  setOpenTimeModal,
}: ManageTimeModalPropsType) => {
  return (
    <StyledModal
      header={group.name}
      subheader="Manage time for"
      content={<TimeDisplay group={group} timeValues={timeValues} />}
      actions={<TimeDisplayControls group={group} timeValues={timeValues} />}
      openModal={openTimeModal}
      setOpenModal={setOpenTimeModal}
    />
  );
};

export default ManageTimeModal;

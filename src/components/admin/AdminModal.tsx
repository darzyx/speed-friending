import { RoundType, TimeValuesType } from "../../pages/group/utils";
import { GroupWithIdType } from "../../types/group";
import StyledModal from "../blocks/StyledModal";
import TimeDisplay from "../time/TimeDisplay";
import AdminActions from "./AdminActions";

type AdminModalPropsType = {
  group: GroupWithIdType;
  timeValues: TimeValuesType;
  openAdminModal: boolean;
  setOpenAdminModal: (openAdminModal: boolean) => void;
  currentTimeInSeconds: number;
  activeRound: RoundType;
};
const AdminModal = ({
  group,
  timeValues,
  openAdminModal,
  setOpenAdminModal,
  currentTimeInSeconds,
  activeRound,
}: AdminModalPropsType) => {
  return (
    <StyledModal
      header={group.name}
      subheader="Manage Group"
      content={<TimeDisplay group={group} timeValues={timeValues} />}
      actions={
        <AdminActions
          group={group}
          timeValues={timeValues}
          setOpenAdminModal={setOpenAdminModal}
          currentTimeInSeconds={currentTimeInSeconds}
          activeRound={activeRound}
        />
      }
      setOpenModal={setOpenAdminModal}
      openModal={openAdminModal}
      size="tiny"
    />
  );
};

export default AdminModal;

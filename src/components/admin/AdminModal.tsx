import { RoundType, TimeValuesType } from "../../pages/group/utils";
import { groupWithIdType } from "../../types/group";
import StyledModal from "../blocks/StyledModal";
import TimeDisplay from "../time/TimeDisplay";
import AdminActions from "./AdminActions";

type AdminModalPropsType = {
  group: groupWithIdType;
  timeValues: TimeValuesType;
  openAdminModal: boolean;
  setOpenAdminModal: (openAdminModal: boolean) => void;
  currentTimeInSeconds: number;
  activeRound: RoundType;
  darkMode: boolean;
};
const AdminModal = ({
  group,
  timeValues,
  openAdminModal,
  setOpenAdminModal,
  currentTimeInSeconds,
  activeRound,
  darkMode,
}: AdminModalPropsType) => {
  return (
    <StyledModal
      header={group.name}
      subheader="Manage Group"
      content={
        <TimeDisplay
          group={group}
          timeValues={timeValues}
          darkMode={darkMode}
        />
      }
      actions={
        <AdminActions
          group={group}
          timeValues={timeValues}
          setOpenAdminModal={setOpenAdminModal}
          currentTimeInSeconds={currentTimeInSeconds}
          activeRound={activeRound}
          darkMode={darkMode}
        />
      }
      setOpenModal={setOpenAdminModal}
      openModal={openAdminModal}
      darkMode={darkMode}
      size="tiny"
    />
  );
};

export default AdminModal;

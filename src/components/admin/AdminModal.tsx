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
  inverted: boolean;
  userIsAdmin: boolean;
};
const AdminModal = ({
  group,
  timeValues,
  openAdminModal,
  setOpenAdminModal,
  currentTimeInSeconds,
  activeRound,
  inverted,
  userIsAdmin,
}: AdminModalPropsType) => {
  return (
    <StyledModal
      header={group.name}
      subheader="Manage"
      content={
        <TimeDisplay
          group={group}
          timeValues={timeValues}
          inverted={inverted}
        />
      }
      actions={
        <AdminActions
          group={group}
          timeValues={timeValues}
          setOpenAdminModal={setOpenAdminModal}
          currentTimeInSeconds={currentTimeInSeconds}
          activeRound={activeRound}
          inverted={inverted}
          userIsAdmin={userIsAdmin}
        />
      }
      setOpenModal={setOpenAdminModal}
      openModal={openAdminModal}
      inverted={inverted}
      size="tiny"
    />
  );
};

export default AdminModal;

import { doc, setDoc, Timestamp } from "firebase/firestore";

import { db } from "../../firebase";
import StyledModal from "../blocks/StyledModal";
import { GroupWithIdType } from "../../types/group";
import TimeDisplay from "./TimeDisplay";
import ManageTimeActions from "./ManageTimeActions";
import { TimeValuesType } from "../../pages/group/utils";

type ManageTimeModalPropsType = {
  userIsAdmin: boolean;
  group: GroupWithIdType;
  timeValues: TimeValuesType;
  openTimeModal: boolean;
  setOpenTimeModal: (openTimeModal: boolean) => void;
};
const ManageTimeModal = ({
  userIsAdmin,
  group,
  timeValues,
  openTimeModal,
  setOpenTimeModal,
}: ManageTimeModalPropsType) => {
  const docRef = doc(db, "groups", group.id);

  const handleClickReset = async () => {
    const payload = {
      ...group,
      round_end_time: Timestamp.now().seconds + group.round_duration,
      round_is_paused: true,
      round_paused_time: group.round_duration,
    };
    setDoc(docRef, payload);
  };

  const handleClickToggleStart = () => {
    if (group.round_is_paused) {
      const payload = {
        ...group,
        round_end_time: Timestamp.now().seconds + group.round_paused_time,
        round_is_paused: false,
      };
      const docRef = doc(db, "groups", group.id);
      setDoc(docRef, payload);
    } else {
      const payload = {
        ...group,
        round_is_paused: true,
        round_paused_time: group.round_end_time - Timestamp.now().seconds,
      };
      setDoc(docRef, payload);
    }
  };

  const handleClickEndRound = () => {
    if (group.round_active < group.round_count) {
      const payload = {
        ...group,
        round_active: group.round_active + 1,
        round_end_time: Timestamp.now().seconds + group.round_duration,
        round_is_paused: true,
        round_paused_time: group.round_duration,
      };
      setDoc(docRef, payload);
    } else {
      const payload = {
        ...group,
        round_end_time: Timestamp.now().seconds,
        round_is_paused: true,
        round_paused_time: 0,
      };
      setDoc(docRef, payload);
    }
  };

  return (
    <StyledModal
      header={group.name}
      subheader="Manage time for"
      content={
        <TimeDisplay
          userIsAdmin={userIsAdmin}
          group={group}
          timeValues={timeValues}
          setOpenTimeModal={setOpenTimeModal}
        />
      }
      actions={
        <ManageTimeActions
          group={group}
          onClickReset={handleClickReset}
          onClickToggleStart={handleClickToggleStart}
          onClickEndRound={handleClickEndRound}
          setOpenTimeModal={setOpenTimeModal}
          timeValues={timeValues}
        />
      }
      openModal={openTimeModal}
      setOpenModal={setOpenTimeModal}
    />
  );
};

export default ManageTimeModal;

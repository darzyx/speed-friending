import { doc, setDoc, Timestamp } from "firebase/firestore";

import { db } from "../../firebase";
import StyledModal from "../blocks/StyledModal";
import { SessionWithIdType } from "../../types/session";
import { SemanticCOLORS } from "semantic-ui-react";
import TimeDisplay from "./TimeDisplay";
import ManageTimeActions from "./ManageTimeActions";

type ManageTimeModalPropsType = {
  userIsAdmin: boolean;
  session: SessionWithIdType;
  timeValues: {
    color: SemanticCOLORS;
    remainingMinutes: string;
    remainingSeconds: string;
  };
  openTimeModal: boolean;
  setOpenTimeModal: (openTimeModal: boolean) => void;
};
const ManageTimeModal = ({
  userIsAdmin,
  session,
  timeValues,
  openTimeModal,
  setOpenTimeModal,
}: ManageTimeModalPropsType) => {
  const docRef = doc(db, "sessions", session.id);

  const handleClickReset = async () => {
    const payload = {
      ...session,
      round_end_time: Timestamp.now().seconds + session.round_duration,
      round_is_paused: true,
      round_paused_time: session.round_duration,
    };
    setDoc(docRef, payload);
  };

  const handleClickToggleStart = () => {
    if (session.round_is_paused) {
      const payload = {
        ...session,
        round_end_time: Timestamp.now().seconds + session.round_paused_time,
        round_is_paused: false,
      };
      const docRef = doc(db, "sessions", session.id);
      setDoc(docRef, payload);
    } else {
      const payload = {
        ...session,
        round_is_paused: true,
        round_paused_time: session.round_end_time - Timestamp.now().seconds,
      };
      setDoc(docRef, payload);
    }
  };

  const handleClickEndRound = () => {
    if (session.round_active < session.round_count) {
      const payload = {
        ...session,
        round_active: session.round_active + 1,
        round_end_time: Timestamp.now().seconds + session.round_duration,
        round_is_paused: true,
        round_paused_time: session.round_duration,
      };
      setDoc(docRef, payload);
    } else {
      const payload = {
        ...session,
        round_end_time: Timestamp.now().seconds,
        round_is_paused: true,
        round_paused_time: 0,
      };
      setDoc(docRef, payload);
    }
  };

  return (
    <StyledModal
      header={session.name}
      subheader="Manage time for"
      content={
        <TimeDisplay
          userIsAdmin={userIsAdmin}
          session={session}
          timeValues={timeValues}
          setOpenTimeModal={setOpenTimeModal}
        />
      }
      actions={
        <ManageTimeActions
          session={session}
          onClickReset={handleClickReset}
          onClickToggleStart={handleClickToggleStart}
          onClickEndRound={handleClickEndRound}
        />
      }
      openModal={openTimeModal}
      setOpenModal={setOpenTimeModal}
    />
  );
};

export default ManageTimeModal;

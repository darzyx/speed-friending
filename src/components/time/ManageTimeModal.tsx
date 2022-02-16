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
  const handleClickReset = async () => {
    const payload = {
      ...session,
      round_end_time: Timestamp.now().seconds + session.round_duration,
    };
    const docRef = doc(db, "sessions", session.id);
    setDoc(docRef, payload);
  };

  const handleClickToggleStart = () => {
    console.log("TOGGLE");
  };

  const handleClickEndRound = () => {
    console.log("CONFIRM END ROUND");
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

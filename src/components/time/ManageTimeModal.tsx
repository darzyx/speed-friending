import StyledModal from "../blocks/StyledModal";
import { SessionWithIdType } from "../../types/session";
import { SemanticCOLORS } from "semantic-ui-react";
import TimeDisplay from "./TimeDisplay";

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
}: ManageTimeModalPropsType) => (
  <StyledModal
    header={session.name}
    subheader="Manage time for"
    content={
      <div>
        <TimeDisplay
          userIsAdmin={userIsAdmin}
          session={session}
          timeValues={timeValues}
          setOpenTimeModal={setOpenTimeModal}
        />
      </div>
    }
    openModal={openTimeModal}
    setOpenModal={setOpenTimeModal}
  />
);

export default ManageTimeModal;

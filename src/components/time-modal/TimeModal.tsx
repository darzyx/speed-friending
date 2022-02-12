import StyledModal from "../blocks/StyledModal";
import { SessionType } from "../../types/session";

type TimeModalPropsType = {
  session: SessionType;
  openTimeModal: boolean;
  setOpenTimeModal: (openTimeModal: boolean) => void;
};
const TimeModal = ({
  session,
  openTimeModal,
  setOpenTimeModal,
}: TimeModalPropsType) => (
  <StyledModal
    header={session.name}
    subheader="Manage time for"
    content={<div>Hello, world!</div>}
    openModal={openTimeModal}
    setOpenModal={setOpenTimeModal}
  />
);

export default TimeModal;

import { CustomModal, CustomHeader } from "../blocks/StyledSemanticComponents";
import modalColors from "../../styles/modalColors";
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
  <CustomModal
    onClose={() => setOpenTimeModal(false)}
    onOpen={() => setOpenTimeModal(true)}
    open={openTimeModal}
    style={modalColors}
    closeIcon
  >
    <CustomHeader>
      Manage time for <br />
      {session.name}
    </CustomHeader>
    <CustomModal.Content style={modalColors}>Hello, world!</CustomModal.Content>
  </CustomModal>
);

export default TimeModal;

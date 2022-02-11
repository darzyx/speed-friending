import { Modal } from "semantic-ui-react";
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
  <Modal
    onClose={() => setOpenTimeModal(false)}
    onOpen={() => setOpenTimeModal(true)}
    open={openTimeModal}
    style={modalColors}
  >
    <Modal.Header style={{ ...modalColors, textAlign: "center" }}>
      Manage time for <br />
      {session.name}
    </Modal.Header>
    <Modal.Content style={modalColors}>Hello, world!</Modal.Content>
  </Modal>
);

export default TimeModal;

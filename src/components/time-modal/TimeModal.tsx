import { Modal } from "semantic-ui-react";
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
    style={{
      backgroundColor: "#27292a",
      color: "rgba(255, 255, 255, 0.9)",
    }}
  >
    <Modal.Header
      style={{
        backgroundColor: "#27292a",
        color: "rgba(255, 255, 255, 0.9)",
        textAlign: "center",
      }}
    >
      Manage time for <br />
      {session.name}
    </Modal.Header>
    <Modal.Content
      style={{
        backgroundColor: "#27292a",
        color: "rgba(255, 255, 255, 0.9)",
      }}
    >
      Hello, world!
    </Modal.Content>
  </Modal>
);

export default TimeModal;

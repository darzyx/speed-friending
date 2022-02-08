import { Location } from "react-router-dom";
import { Modal, Divider } from "semantic-ui-react";

import NewForm from "./NewForm";

type NewModalPropsType = {
  location: Location;
  openNewModal: boolean;
  setOpenNewModal: (openNewModal: boolean) => void;
};
const NewModal = ({
  location,
  openNewModal,
  setOpenNewModal,
}: NewModalPropsType) => (
  <Modal
    onClose={() => setOpenNewModal(false)}
    onOpen={() => setOpenNewModal(true)}
    open={openNewModal}
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
      Create New Session
    </Modal.Header>
    <Modal.Content
      style={{
        backgroundColor: "#27292a",
        color: "rgba(255, 255, 255, 0.9)",
      }}
    >
      <NewForm setOpenNewModal={setOpenNewModal} />
      <Divider clearing hidden fitted />
    </Modal.Content>
  </Modal>
);

export default NewModal;

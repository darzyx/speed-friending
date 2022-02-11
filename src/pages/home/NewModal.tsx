import { Location } from "react-router-dom";
import { Modal, Divider } from "semantic-ui-react";

import NewForm from "./NewForm";
import modalColors from "../../styles/modalColors";

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
    style={modalColors}
  >
    <Modal.Header style={{ ...modalColors, textAlign: "center" }}>
      Create New Session
    </Modal.Header>
    <Modal.Content style={modalColors}>
      <NewForm setOpenNewModal={setOpenNewModal} />
      <Divider clearing hidden fitted />
    </Modal.Content>
  </Modal>
);

export default NewModal;

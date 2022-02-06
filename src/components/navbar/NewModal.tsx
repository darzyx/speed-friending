import { Location } from "react-router-dom";
import { Modal, Divider, Icon, Button } from "semantic-ui-react";

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
    trigger={
      <Button icon labelPosition="right" primary>
        Create <Icon name="plus" />
      </Button>
    }
  >
    <Modal.Header
      style={{
        backgroundColor: "#1b1c1d",
        color: "rgba(255, 255, 255, 0.9)",
      }}
    >
      Create New Group Session
    </Modal.Header>
    <Modal.Content
      style={{
        backgroundColor: "#1b1c1d",
        color: "rgba(255, 255, 255, 0.9)",
      }}
    >
      <NewForm setOpenNewModal={setOpenNewModal} />
      <Divider clearing hidden fitted />
    </Modal.Content>
  </Modal>
);

export default NewModal;

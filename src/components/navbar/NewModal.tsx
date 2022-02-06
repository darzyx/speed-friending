import { Button, Modal, Icon, Divider } from "semantic-ui-react";

import NewForm from "./NewForm";

type NewModalPropsType = {
  openNewModal: boolean;
  setOpenNewModal: (openNewModal: boolean) => void;
};
const NewModal = ({ openNewModal, setOpenNewModal }: NewModalPropsType) => (
  <Modal
    onClose={() => setOpenNewModal(false)}
    onOpen={() => setOpenNewModal(true)}
    open={openNewModal}
    trigger={
      <Button icon floated="right" labelPosition="right" primary>
        Create
        <Icon name="plus" />
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

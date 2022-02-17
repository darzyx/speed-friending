import { Modal as SemanticModal, Header } from "semantic-ui-react";
import styled from "styled-components";

const modalColors = {
  backgroundColor: "#27292a",
  color: "rgba(255, 255, 255, 0.9)",
};

const Modal = styled(SemanticModal).attrs({ closeIcon: true })`
  &&&& {
    ${modalColors}

    // Top right close icon
    i.close.icon {
      color: rgba(255, 255, 255, 0.9) !important;
    }

    // Main modal header
    h1.ui.inverted.center.aligned.header {
      padding: 0.75rem 1rem !important;
    }
  }
`;

type StyledModalPropsType = {
  header?: string | JSX.Element;
  subheader?: string;
  content?: JSX.Element;
  actions?: JSX.Element;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
};
const StyledModal = ({
  header,
  subheader,
  content,
  actions,
  openModal,
  setOpenModal,
}: StyledModalPropsType) => (
  <Modal
    onClose={() => setOpenModal(false)}
    onOpen={() => setOpenModal(true)}
    open={openModal}
  >
    {header && (
      <Header
        as="h1"
        inverted
        textAlign="center"
        style={{
          ...modalColors,
          marginTop: "7px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "100%",
        }}
      >
        {subheader && (
          <Header.Subheader style={{ marginBottom: "7px" }}>
            {subheader}
          </Header.Subheader>
        )}
        {header}
      </Header>
    )}
    {content && <Modal.Content style={modalColors}>{content}</Modal.Content>}
    {actions && <Modal.Actions style={modalColors}>{actions}</Modal.Actions>}
  </Modal>
);

export default StyledModal;

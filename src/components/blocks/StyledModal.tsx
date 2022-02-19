import { Modal as SemanticModal, Header } from "semantic-ui-react";
import styled from "styled-components";

const Modal = styled(SemanticModal).attrs({ closeIcon: true })`
  &&&& {
    // Main modal header
    h1.ui.center.aligned.header {
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
  size?: string;
};
const StyledModal = ({
  header,
  subheader,
  content,
  actions,
  openModal,
  setOpenModal,
  size,
}: StyledModalPropsType) => (
  <Modal
    open={openModal}
    onClose={() => setOpenModal(false)}
    onOpen={() => setOpenModal(true)}
    {...(size && { size })}
  >
    {header && (
      <Header
        as="h1"
        textAlign="center"
        style={{
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
    {content && <Modal.Content>{content}</Modal.Content>}
    {actions && <Modal.Actions>{actions}</Modal.Actions>}
  </Modal>
);

export default StyledModal;

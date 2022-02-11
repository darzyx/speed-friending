import { Header, Modal } from "semantic-ui-react";
import modalColors from "../../styles/modalColors";
import InfoList from "./InfoList";

type InfoModalPropsType = {
  openInfoModal: boolean;
  setOpenInfoModal: (openInfoModal: boolean) => void;
};
const InfoModal = ({ openInfoModal, setOpenInfoModal }: InfoModalPropsType) => (
  <Modal
    onClose={() => setOpenInfoModal(false)}
    onOpen={() => setOpenInfoModal(true)}
    open={openInfoModal}
    style={modalColors}
  >
    <Header style={{ ...modalColors, textAlign: "center" }}>
      <Header.Subheader style={{ color: "rgba(255, 255, 255, 0.8)" }}>
        Info
      </Header.Subheader>
      How This Works
    </Header>
    <Modal.Content style={modalColors}>
      <InfoList />
    </Modal.Content>
  </Modal>
);

export default InfoModal;

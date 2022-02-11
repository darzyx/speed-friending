import modalColors from "../../styles/modalColors";
import { CustomModal, CustomHeader } from "../blocks/StyledSemanticComponents";
import InfoList from "./InfoList";

type InfoModalPropsType = {
  openInfoModal: boolean;
  setOpenInfoModal: (openInfoModal: boolean) => void;
};
const InfoModal = ({ openInfoModal, setOpenInfoModal }: InfoModalPropsType) => (
  <CustomModal
    onClose={() => setOpenInfoModal(false)}
    onOpen={() => setOpenInfoModal(true)}
    open={openInfoModal}
    style={modalColors}
    closeIcon
  >
    <CustomHeader>
      <CustomHeader.Subheader style={{ color: "rgba(255, 255, 255, 0.8)" }}>
        Info
      </CustomHeader.Subheader>
      How This Works
    </CustomHeader>
    <CustomModal.Content style={modalColors}>
      <InfoList />
    </CustomModal.Content>
  </CustomModal>
);

export default InfoModal;

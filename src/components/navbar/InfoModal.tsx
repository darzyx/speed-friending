import { Button, Divider } from "semantic-ui-react";

import StyledModal from "../blocks/StyledModal";
import CenterMiddle from "../blocks/CenterMiddle";
import InfoList from "./InfoList";

type InfoModalPropsType = {
  openInfoModal: boolean;
  setOpenInfoModal: (openInfoModal: boolean) => void;
};
const InfoModal = ({ openInfoModal, setOpenInfoModal }: InfoModalPropsType) => {
  const handleCloseInfoModal = () => setOpenInfoModal(false);
  return (
    <StyledModal
      header="How This Works"
      subheader="Info"
      content={
        <div>
          <InfoList onCloseInfoModal={handleCloseInfoModal} />
          <Divider hidden />
        </div>
      }
      actions={
        <CenterMiddle>
          <Button onClick={handleCloseInfoModal}>Close</Button>
        </CenterMiddle>
      }
      openModal={openInfoModal}
      setOpenModal={setOpenInfoModal}
      size="small"
    />
  );
};

export default InfoModal;

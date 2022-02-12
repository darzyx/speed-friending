import { Button, Divider } from "semantic-ui-react";

import StyledModal from "../blocks/StyledModal";
import CenterMiddle from "../blocks/CenterMiddle";
import InfoList from "./InfoList";

type InfoModalPropsType = {
  openInfoModal: boolean;
  setOpenInfoModal: (openInfoModal: boolean) => void;
};
const InfoModal = ({ openInfoModal, setOpenInfoModal }: InfoModalPropsType) => (
  <StyledModal
    header="How This Works"
    subheader="Info"
    content={
      <div>
        <InfoList />
        <Divider hidden />
        <CenterMiddle>
          <Button onClick={() => setOpenInfoModal(false)}>Close</Button>
        </CenterMiddle>
      </div>
    }
    openModal={openInfoModal}
    setOpenModal={setOpenInfoModal}
  />
);

export default InfoModal;

import { Button, Divider, Grid } from "semantic-ui-react";

import StyledModal from "../blocks/StyledModal";
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
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column textAlign="center">
              <Button onClick={handleCloseInfoModal}>Close</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      }
      openModal={openInfoModal}
      setOpenModal={setOpenInfoModal}
      size="small"
    />
  );
};

export default InfoModal;

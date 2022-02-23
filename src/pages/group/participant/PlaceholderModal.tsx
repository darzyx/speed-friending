import { Button, Grid, Icon } from "semantic-ui-react";

import StyledModal from "../../../components/blocks/StyledModal";

type ParticipantPropsType = {
  nPartner: number;
  openPlaceholderModal: boolean;
  setOpenPlaceholderModal: (openPlaceholderModal: boolean) => void;
};
const PlaceholderModal = ({
  nPartner,
  openPlaceholderModal,
  setOpenPlaceholderModal,
}: ParticipantPropsType) => (
  <StyledModal
    header="Placeholder"
    subheader={<Icon name="ban" style={{ margin: "0" }} />}
    content={
      <p style={{ textAlign: "center" }}>
        {`This is a placeholder. ` +
          `The group has an odd number of participants, ` +
          `so a different person will have to take a break each round. ` +
          `Participant ${nPartner} takes a break this round `}
      </p>
    }
    actions={
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column textAlign="center">
            <Button onClick={() => setOpenPlaceholderModal(false)}>
              Close
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    }
    openModal={openPlaceholderModal}
    setOpenModal={setOpenPlaceholderModal}
    size="tiny"
  />
);

export default PlaceholderModal;

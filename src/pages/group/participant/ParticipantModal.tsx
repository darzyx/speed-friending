import { Button, Grid, Icon } from "semantic-ui-react";

import StyledModal from "../../../components/blocks/StyledModal";

type ParticipantModalModalPropsType = {
  nParticipant: number;
  nPartner: number;
  openParticipantModal: boolean;
  setOpenParticipantModal: (openParticipantModal: boolean) => void;
  inverted: boolean;
};
const ParticipantModal = ({
  nParticipant,
  nPartner,
  openParticipantModal,
  setOpenParticipantModal,
  inverted,
}: ParticipantModalModalPropsType) => (
  <StyledModal
    header={`Participant #${nParticipant}`}
    subheader={<Icon name="user" style={{ margin: "0" }} />}
    content={
      <p style={{ textAlign: "center" }}>
        {`Participant ${nParticipant} is partnered with ` +
          `participant ${nPartner} this round`}
      </p>
    }
    actions={
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column textAlign="center">
            <Button
              active={!inverted}
              onClick={() => setOpenParticipantModal(false)}
            >
              Close
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    }
    openModal={openParticipantModal}
    setOpenModal={setOpenParticipantModal}
    inverted={inverted}
    size="tiny"
  />
);

export default ParticipantModal;

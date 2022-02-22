import { Button, Grid, Icon } from "semantic-ui-react";

import StyledModal from "../../../components/blocks/StyledModal";

type ParticipantModalModalPropsType = {
  n: number;
  partner: number;
  openParticipantModal: boolean;
  setOpenParticipantModal: (openParticipantModal: boolean) => void;
};
const ParticipantModal = ({
  n,
  partner,
  openParticipantModal,
  setOpenParticipantModal,
}: ParticipantModalModalPropsType) => (
  <StyledModal
    header={`Participant #${n}`}
    subheader={<Icon name="user" style={{ margin: "0" }} />}
    content={
      <p style={{ textAlign: "center" }}>
        {`Participant ${n} is partnered with ` +
          `participant ${partner} this round`}
      </p>
    }
    actions={
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column textAlign="center">
            <Button onClick={() => setOpenParticipantModal(false)}>
              Close
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    }
    openModal={openParticipantModal}
    setOpenModal={setOpenParticipantModal}
    size="tiny"
  />
);

export default ParticipantModal;

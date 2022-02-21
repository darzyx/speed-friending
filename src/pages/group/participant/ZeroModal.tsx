import { Button, Grid, Icon } from "semantic-ui-react";

import StyledModal from "../../../components/blocks/StyledModal";

type ParticipantPropsType = {
  partner: number;
  openZeroModal: boolean;
  setOpenZeroModal: (openZeroModal: boolean) => void;
};
const ZeroModal = ({
  partner,
  openZeroModal,
  setOpenZeroModal,
}: ParticipantPropsType) => (
  <StyledModal
    header="Placeholder"
    subheader={<Icon name="ban" style={{ margin: "0" }} />}
    content={
      <p>
        {`This is a placeholder. ` +
          `The group has an odd number of participants, ` +
          `so a different person will have to take a break each round. ` +
          `Whoever matches with this placeholder ` +
          `(participant ${partner} this round) ` +
          `will take a break`}
      </p>
    }
    actions={
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column textAlign="center">
            <Button onClick={() => setOpenZeroModal(false)}>Close</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    }
    openModal={openZeroModal}
    setOpenModal={setOpenZeroModal}
    size="tiny"
  />
);

export default ZeroModal;

import { Button, Grid, Icon } from "semantic-ui-react";

import StyledModal from "../../../components/blocks/StyledModal";

type DropoutModalPropsType = {
  nParticipant: number;
  nPartner: number;
  openDropoutModal: boolean;
  setOpenDropoutModal: (openDropoutModal: boolean) => void;
};
const DropoutModal = ({
  nParticipant,
  nPartner,
  openDropoutModal,
  setOpenDropoutModal,
}: DropoutModalPropsType) => (
  <StyledModal
    header={`Participant #${nParticipant}`}
    subheader={<Icon name="remove user" style={{ margin: "0" }} />}
    content={
      <p style={{ textAlign: "center" }}>
        {`Participant ${nParticipant} dropped out, ` +
          `so participant ${nPartner} takes a break this round `}
      </p>
    }
    actions={
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column textAlign="center">
            <Button onClick={() => setOpenDropoutModal(false)}>Close</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    }
    openModal={openDropoutModal}
    setOpenModal={setOpenDropoutModal}
    size="tiny"
  />
);

export default DropoutModal;

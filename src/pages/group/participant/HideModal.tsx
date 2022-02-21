import { Button, Grid, Icon } from "semantic-ui-react";

import StyledModal from "../../../components/blocks/StyledModal";

type ParticipantPropsType = {
  n: number;
  partner: number;
  openHideModal: boolean;
  setOpenHideModal: (openHideModal: boolean) => void;
};
const HideModal = ({
  n,
  partner,
  openHideModal,
  setOpenHideModal,
}: ParticipantPropsType) => (
  <StyledModal
    header={`Participant #${n}`}
    subheader={<Icon name="remove user" style={{ margin: "0" }} />}
    content={
      <p style={{ textAlign: "center" }}>
        {`Participant ${n} dropped out, ` +
          `so participant ${partner} will take a break for this round `}
      </p>
    }
    actions={
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column textAlign="center">
            <Button onClick={() => setOpenHideModal(false)}>Close</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    }
    openModal={openHideModal}
    setOpenModal={setOpenHideModal}
    size="tiny"
  />
);

export default HideModal;

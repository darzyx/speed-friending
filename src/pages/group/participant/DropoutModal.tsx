import { Button, Grid, Icon } from "semantic-ui-react";

import StyledModal from "../../../components/blocks/StyledModal";
import { dropoutsType } from "../../../types/group";

type DropoutModalPropsType = {
  nParticipant: number;
  nPartner: number;
  openDropoutModal: boolean;
  setOpenDropoutModal: (openDropoutModal: boolean) => void;
  dropouts: dropoutsType;
  inverted: boolean;
};
const DropoutModal = ({
  nParticipant,
  nPartner,
  openDropoutModal,
  setOpenDropoutModal,
  dropouts,
  inverted,
}: DropoutModalPropsType) => {
  const dropout = dropouts.find((d) => d.participant_number === nParticipant);

  return (
    <StyledModal
      header={`Participant #${nParticipant}`}
      subheader={<Icon name="remove user" style={{ margin: "0" }} />}
      content={
        <p style={{ textAlign: "center" }}>
          {`Participant ${dropout?.participant_number} dropped out ` +
            `in round ${dropout?.round_dropped_out}, ` +
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
      inverted={inverted}
      size="tiny"
    />
  );
};

export default DropoutModal;

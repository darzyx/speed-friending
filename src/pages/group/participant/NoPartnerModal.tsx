import { Button, Grid } from "semantic-ui-react";

import StyledModal from "../../../components/blocks/StyledModal";
import { dropoutsType } from "../../../types/group";

type NoPartnerModalModalPropsType = {
  nParticipant: number;
  nPartner: number;
  openNoPartnerModal: boolean;
  setOpenNoPartnerModal: (openNoPartnerModal: boolean) => void;
  dropouts: dropoutsType;
  inverted: boolean;
};
const NoPartnerModal = ({
  nParticipant,
  nPartner,
  openNoPartnerModal,
  setOpenNoPartnerModal,
  dropouts,
  inverted,
}: NoPartnerModalModalPropsType) => {
  let dropout = null;
  if (nPartner !== 0) {
    dropout = dropouts.find((d) => d.participant_number === nPartner);
  }

  return (
    <StyledModal
      header={`Participant #${nParticipant}`}
      subheader="No Partner For"
      content={
        <div>
          {nPartner === 0 ? (
            <p style={{ textAlign: "center" }}>
              {`This group has an odd number of participants, ` +
                `so a different person will have to take a break each round. ` +
                `Participant ${nParticipant} takes a break this round `}
            </p>
          ) : (
            <p style={{ textAlign: "center" }}>
              {`Participant ${dropout?.participant_number} dropped out ` +
                `in round ${dropout?.round_dropped_out}, ` +
                `so participant ${nParticipant} takes a break this round `}
            </p>
          )}
        </div>
      }
      actions={
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column textAlign="center">
              <Button
                active={!inverted}
                onClick={() => setOpenNoPartnerModal(false)}
              >
                Close
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      }
      openModal={openNoPartnerModal}
      setOpenModal={setOpenNoPartnerModal}
      inverted={inverted}
      size="tiny"
    />
  );
};

export default NoPartnerModal;

import { Button, Grid } from "semantic-ui-react";

import StyledModal from "../../../components/blocks/StyledModal";

type NoPartnerModalModalPropsType = {
  nParticipant: number;
  nPartner: number;
  openNoPartnerModal: boolean;
  setOpenNoPartnerModal: (openNoPartnerModal: boolean) => void;
};
const NoPartnerModal = ({
  nParticipant,
  nPartner,
  openNoPartnerModal,
  setOpenNoPartnerModal,
}: NoPartnerModalModalPropsType) => (
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
            {`Participant ${nPartner} dropped out, ` +
              `so participant ${nParticipant} takes a break this round `}
          </p>
        )}
      </div>
    }
    actions={
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column textAlign="center">
            <Button onClick={() => setOpenNoPartnerModal(false)}>Close</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    }
    openModal={openNoPartnerModal}
    setOpenModal={setOpenNoPartnerModal}
    size="tiny"
  />
);

export default NoPartnerModal;

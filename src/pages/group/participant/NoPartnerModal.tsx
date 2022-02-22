import { Button, Grid } from "semantic-ui-react";

import StyledModal from "../../../components/blocks/StyledModal";

type NoPartnerModalModalPropsType = {
  n: number;
  partner: number;
  openNoPartnerModal: boolean;
  setOpenNoPartnerModal: (openNoPartnerModal: boolean) => void;
};
const NoPartnerModal = ({
  n,
  partner,
  openNoPartnerModal,
  setOpenNoPartnerModal,
}: NoPartnerModalModalPropsType) => (
  <StyledModal
    header={`Participant #${n}`}
    subheader="No Partner For"
    content={
      <div>
        {partner === 0 ? (
          <p style={{ textAlign: "center" }}>
            {`This group has an odd number of participants, ` +
              `so a different person will have to take a break each round. ` +
              `Participant ${n} takes a break this round `}
          </p>
        ) : (
          <p style={{ textAlign: "center" }}>
            {`Participant ${partner} dropped out, ` +
              `so participant ${n} will take a break this round `}
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

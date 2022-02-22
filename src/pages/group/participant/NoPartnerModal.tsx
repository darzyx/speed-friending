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
      <p style={{ textAlign: "center" }}>
        {`Participant ${partner} dropped out, ` +
          `so participant ${n} will take a break this round `}
      </p>
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

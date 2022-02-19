import StyledModal from "../blocks/StyledModal";
import { Button, Grid } from "semantic-ui-react";

type ConfirmModalPropsType = {
  confirmingAction: string;
  onCancelAction: () => void;
  onConfirmAction: () => void;
  openConfirmModal: boolean;
  setOpenConfirmModal: (openConfirmModal: boolean) => void;
};
const ConfirmModal = ({
  confirmingAction,
  onCancelAction,
  onConfirmAction,
  openConfirmModal,
  setOpenConfirmModal,
}: ConfirmModalPropsType) => (
  <StyledModal
    header="Are you sure?"
    subheader="Confirm"
    content={
      <p style={{ textAlign: "center" }}>
        {confirmingAction === "reset"
          ? "You are about to reset the round time"
          : confirmingAction === "end_round"
          ? "You are about to end the round"
          : confirmingAction === "delete"
          ? "You are about to delete this group"
          : "Please confirm your action"}
      </p>
    }
    actions={
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column textAlign="right" verticalAlign="middle">
            <Button onClick={onCancelAction}>Cancel</Button>
          </Grid.Column>
          <Grid.Column textAlign="left" verticalAlign="middle">
            <Button primary onClick={onConfirmAction}>
              Confirm
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    }
    openModal={openConfirmModal}
    setOpenModal={setOpenConfirmModal}
  />
);

export default ConfirmModal;

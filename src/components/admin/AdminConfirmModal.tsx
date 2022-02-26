import StyledModal from "../blocks/StyledModal";
import { Button, Grid } from "semantic-ui-react";

type AdminConfirmModalPropsType = {
  confirmingAction: string;
  onCancelAction: () => void;
  onConfirmAction: () => void;
  openConfirmModal: boolean;
  setOpenConfirmModal: (openConfirmModal: boolean) => void;
  inverted: boolean;
};
const AdminConfirmModal = ({
  confirmingAction,
  onCancelAction,
  onConfirmAction,
  openConfirmModal,
  setOpenConfirmModal,
  inverted,
}: AdminConfirmModalPropsType) => (
  <StyledModal
    header="Are you sure?"
    subheader="Confirm"
    content={
      <p style={{ textAlign: "center" }}>
        {confirmingAction === "reset"
          ? "You are about to reset the round time"
          : confirmingAction === "next_round"
          ? "You are about to end this round and start the next one"
          : confirmingAction === "prev_round"
          ? "You are about to end this round and start the previous one"
          : confirmingAction === "delete"
          ? "You are about to delete this group"
          : "Please confirm your action"}
      </p>
    }
    actions={
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column textAlign="right" verticalAlign="middle">
            <Button secondary onClick={onCancelAction}>
              Cancel
            </Button>
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
    inverted={inverted}
    size="small"
  />
);

export default AdminConfirmModal;

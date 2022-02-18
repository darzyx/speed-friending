import { Button, Grid, Icon } from "semantic-ui-react";

import { GroupWithIdType } from "../../types/group";
import StyledModal from "../../components/blocks/StyledModal";

type GroupAdminFooterActionsPropsType = {
  group: GroupWithIdType;
  handleDeleteGroup: () => void;
  openConfirmDeleteModal: boolean;
  setOpenConfirmDeleteModal: (openConfirmDeleteModal: boolean) => void;
  isDeleting: boolean;
};
const GroupAdminFooterActions = ({
  group,
  handleDeleteGroup,
  openConfirmDeleteModal,
  setOpenConfirmDeleteModal,
  isDeleting,
}: GroupAdminFooterActionsPropsType) => (
  <>
    <Button
      style={{ marginTop: "10px", minWidth: "175px" }}
      color="grey"
      size="small"
    >
      <Icon name="remove user" /> Remove Participant
    </Button>
    <Button
      onClick={() => setOpenConfirmDeleteModal(true)}
      style={{ marginTop: "10px", minWidth: "175px" }}
      color="red"
      size="small"
    >
      <Icon name="close" /> Delete Group
    </Button>
    <StyledModal
      header="Delete"
      subheader={group.name}
      content={<p style={{ textAlign: "center" }}>This cannot be undone</p>}
      actions={
        <Grid inverted>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="right" verticalAlign="middle">
              <Button onClick={() => setOpenConfirmDeleteModal(false)}>
                Cancel
              </Button>
            </Grid.Column>
            <Grid.Column textAlign="left" verticalAlign="middle">
              <Button
                onClick={handleDeleteGroup}
                disabled={isDeleting}
                loading={isDeleting}
                negative
              >
                Delete
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      }
      openModal={openConfirmDeleteModal}
      setOpenModal={setOpenConfirmDeleteModal}
    />
  </>
);

export default GroupAdminFooterActions;

import { Button, Grid, Icon, Segment } from "semantic-ui-react";

import { GroupWithIdType } from "../../types/group";
import StyledModal from "../../components/blocks/StyledModal";
import CenterMiddle from "../../components/blocks/CenterMiddle";

type GroupAdminFooterActionsPropsType = {
  group: GroupWithIdType;
  handleDeleteGroup: () => void;
  openConfirmDeleteModal: boolean;
  setOpenConfirmDeleteModal: (openConfirmDeleteModal: boolean) => void;
  setOpenPastRoundsModal: (openPastRoundsModal: boolean) => void;
  isDeleting: boolean;
};
const GroupAdminFooterActions = ({
  group,
  handleDeleteGroup,
  openConfirmDeleteModal,
  setOpenConfirmDeleteModal,
  setOpenPastRoundsModal,
  isDeleting,
}: GroupAdminFooterActionsPropsType) => (
  <>
    <CenterMiddle>
      <Segment padded inverted style={{ backgroundColor: "#27292a" }}>
        <Grid inverted>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Button
                onClick={() => setOpenPastRoundsModal(true)}
                color="grey"
                fluid
              >
                <Icon name="history" /> Past Rounds
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Button color="yellow" fluid>
                <Icon name="remove user" /> Dropout
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button
                onClick={() => setOpenConfirmDeleteModal(true)}
                color="red"
                fluid
              >
                <Icon name="close" /> Delete
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </CenterMiddle>
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

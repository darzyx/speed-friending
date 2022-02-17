import { Button, Grid } from "semantic-ui-react";
import { TimeValuesType } from "../../pages/group/utils";

import { GroupWithIdType } from "../../types/group";

type ManageTimeActionsPropsType = {
  group: GroupWithIdType;
  onClickReset: () => void;
  onClickToggleStart: () => void;
  onClickEndRound: () => void;
  setOpenTimeModal: (openTimeModal: boolean) => void;
  timeValues: TimeValuesType;
};
const ManageTimeActions = ({
  group,
  onClickReset,
  onClickToggleStart,
  onClickEndRound,
  setOpenTimeModal,
  timeValues,
}: ManageTimeActionsPropsType) => {
  const outOfTime = timeValues.remainingTime <= 0;

  return (
    <Grid inverted>
      <Grid.Row columns={2}>
        <Grid.Column textAlign="right" verticalAlign="middle">
          <Button onClick={onClickReset} size="huge" fluid color="grey">
            Reset
          </Button>
        </Grid.Column>
        <Grid.Column textAlign="left" verticalAlign="middle">
          <Button
            disabled={outOfTime}
            onClick={onClickToggleStart}
            positive={group.round_is_paused || outOfTime}
            negative={!group.round_is_paused && !outOfTime}
            size="huge"
            fluid
          >
            {group.round_is_paused || outOfTime ? "Start" : "Pause"}
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1}>
        <Grid.Column textAlign="center" verticalAlign="middle">
          <Button onClick={onClickEndRound} primary size="huge" fluid>
            End Round
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1}>
        <Grid.Column textAlign="center" verticalAlign="middle">
          <Button onClick={() => setOpenTimeModal(false)}>Close</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ManageTimeActions;

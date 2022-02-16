import { Button, Grid } from "semantic-ui-react";

import { SessionWithIdType } from "../../types/session";

type ManageTimeActionsPropsType = {
  session: SessionWithIdType;
  onClickReset: () => void;
  onClickToggleStart: () => void;
  onClickEndRound: () => void;
};
const ManageTimeActions = ({
  session,
  onClickReset,
  onClickToggleStart,
  onClickEndRound,
}: ManageTimeActionsPropsType) => (
  <Grid inverted>
    <Grid.Row columns={2}>
      <Grid.Column textAlign="right" verticalAlign="middle">
        <Button onClick={onClickReset} size="huge" fluid secondary>
          Reset
        </Button>
      </Grid.Column>
      <Grid.Column textAlign="left" verticalAlign="middle">
        <Button
          onClick={onClickToggleStart}
          positive={session.round_is_paused}
          negative={!session.round_is_paused}
          size="huge"
          fluid
        >
          {session.round_is_paused ? "Start" : "Pause"}
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
  </Grid>
);

export default ManageTimeActions;

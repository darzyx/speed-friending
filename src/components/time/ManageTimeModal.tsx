import StyledModal from "../blocks/StyledModal";
import { SessionWithIdType } from "../../types/session";
import { Button, Grid, SemanticCOLORS } from "semantic-ui-react";
import TimeDisplay from "./TimeDisplay";

type ManageTimeModalPropsType = {
  userIsAdmin: boolean;
  session: SessionWithIdType;
  timeValues: {
    color: SemanticCOLORS;
    remainingMinutes: string;
    remainingSeconds: string;
  };
  openTimeModal: boolean;
  setOpenTimeModal: (openTimeModal: boolean) => void;
};
const ManageTimeModal = ({
  userIsAdmin,
  session,
  timeValues,
  openTimeModal,
  setOpenTimeModal,
}: ManageTimeModalPropsType) => {
  const handleClickReset = () => {
    console.log("CONFIRM RESET");
  };

  const handleClickToggleStart = () => {
    console.log("TOGGLE");
  };

  const handleClickEndRound = () => {
    console.log("CONFIRM END ROUND");
  };

  return (
    <StyledModal
      header={session.name}
      subheader="Manage time for"
      content={
        <TimeDisplay
          userIsAdmin={userIsAdmin}
          session={session}
          timeValues={timeValues}
          setOpenTimeModal={setOpenTimeModal}
        />
      }
      actions={
        <Grid inverted>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="right" verticalAlign="middle">
              <Button onClick={handleClickReset} size="huge" fluid secondary>
                Reset
              </Button>
            </Grid.Column>
            <Grid.Column textAlign="left" verticalAlign="middle">
              <Button
                onClick={handleClickToggleStart}
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
              <Button onClick={handleClickEndRound} primary size="huge" fluid>
                End Round
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      }
      openModal={openTimeModal}
      setOpenModal={setOpenTimeModal}
    />
  );
};

export default ManageTimeModal;

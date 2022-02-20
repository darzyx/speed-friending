import { Button, Divider, Grid, Header } from "semantic-ui-react";

import { GameType } from "./utils";
import Participants from "./Participants";
import StyledModal from "../../components/blocks/StyledModal";
import { GroupWithIdType } from "../../types/group";

type PastRoundsModalPropsType = {
  game: GameType;
  group: GroupWithIdType;
  activeRound: number;
  openPastRoundsModal: boolean;
  setOpenPastRoundsModal: (openPastRoundsModal: boolean) => void;
  currentTimeInSeconds: number;
};
const PastRoundsModal = ({
  game,
  group,
  activeRound,
  openPastRoundsModal,
  setOpenPastRoundsModal,
  currentTimeInSeconds,
}: PastRoundsModalPropsType) => {
  const pastRounds = Object.values(game).slice(0, Number(activeRound) - 1);
  const hasPastRounds = Array.isArray(pastRounds) && pastRounds.length > 0;

  return (
    <StyledModal
      header="Past Rounds"
      subheader={group.name}
      content={
        <div>
          {hasPastRounds ? (
            pastRounds
              .map((pastRound, index) => (
                <div key={index}>
                  <Header inverted as="h3" textAlign="center">
                    {`Round ${index + 1}`}
                  </Header>
                  <Participants
                    round={pastRound}
                    dropouts={group.dropouts}
                    currentTimeInSeconds={currentTimeInSeconds}
                  />
                  <Divider hidden={index === 0} />
                </div>
              ))
              .reverse()
          ) : (
            <>
              <p style={{ textAlign: "center" }}>
                {group.name} doesn't have any past rounds yet. Past rounds will
                appear here
              </p>
              <Divider hidden />
            </>
          )}
        </div>
      }
      actions={
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column textAlign="center">
              <Button onClick={() => setOpenPastRoundsModal(false)}>
                Close
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      }
      openModal={openPastRoundsModal}
      setOpenModal={setOpenPastRoundsModal}
    />
  );
};

export default PastRoundsModal;

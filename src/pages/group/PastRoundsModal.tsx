import { Button, Divider, Grid, Header } from "semantic-ui-react";

import { GameType } from "./utils";
import Participants from "./Participants";
import StyledModal from "../../components/blocks/StyledModal";
import { groupWithIdType } from "../../types/group";

type PastRoundsModalPropsType = {
  game: GameType;
  group: groupWithIdType;
  activeRound: number;
  openPastRoundsModal: boolean;
  setOpenPastRoundsModal: (openPastRoundsModal: boolean) => void;
};
const PastRoundsModal = ({
  game,
  group,
  activeRound,
  openPastRoundsModal,
  setOpenPastRoundsModal,
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
                    roundNumber={index + 1}
                    dropouts={group.dropouts}
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

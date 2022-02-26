import { Button, Divider, Grid, Header } from "semantic-ui-react";

import { GameType } from "./utils";
import Participants from "./Participants";
import StyledModal from "../../components/blocks/StyledModal";
import { groupWithIdType } from "../../types/group";

type PastRoundsModalPropsType = {
  game: GameType;
  group: groupWithIdType;
  openPastRoundsModal: boolean;
  setOpenPastRoundsModal: (openPastRoundsModal: boolean) => void;
  darkMode: boolean;
};
const PastRoundsModal = ({
  game,
  group,
  openPastRoundsModal,
  setOpenPastRoundsModal,
  darkMode,
}: PastRoundsModalPropsType) => {
  const pastRounds = Object.values(game).slice(0, group.active_round_num - 1);
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
                  <Header inverted={darkMode} as="h3" textAlign="center">
                    {`Round ${index + 1}`}
                  </Header>
                  <Participants
                    round={pastRound}
                    roundNumber={index + 1}
                    dropouts={group.dropouts}
                    darkMode={darkMode}
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
      darkMode={darkMode}
    />
  );
};

export default PastRoundsModal;

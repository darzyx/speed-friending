import { Button, Divider, Header } from "semantic-ui-react";

import Participants from "./Participants";
import CenterMiddle from "../../components/blocks/CenterMiddle";
import StyledModal from "../../components/blocks/StyledModal";
import { GameType } from "./utils";
import { SessionWithIdType } from "../../types/session";

type PastRoundsModalPropsType = {
  game: GameType;
  activeRound: number;
  openPastRoundsModal: boolean;
  setOpenPastRoundsModal: (openPastRoundsModal: boolean) => void;
  session: SessionWithIdType;
};
const PastRoundsModal = ({
  game,
  activeRound,
  openPastRoundsModal,
  setOpenPastRoundsModal,
  session,
}: PastRoundsModalPropsType) => {
  const pastRounds = Object.values(game).slice(0, Number(activeRound) - 1);
  const hasPastRounds = Array.isArray(pastRounds) && pastRounds.length > 0;

  return (
    <StyledModal
      header="Past Rounds"
      subheader={session.name}
      content={
        <div>
          {hasPastRounds ? (
            pastRounds
              .map((pastRound, index) => (
                <div key={index}>
                  <Header as="h3" inverted textAlign="center">
                    {`Round ${index + 1}`}
                  </Header>
                  <Participants round={pastRound} />
                  <Divider hidden={index === 0} />
                </div>
              ))
              .reverse()
          ) : (
            <>
              <p style={{ textAlign: "center" }}>
                Your past rounds will appear here. You don't have any past
                rounds yet
              </p>
              <Divider hidden />
            </>
          )}
          <CenterMiddle>
            <Button onClick={() => setOpenPastRoundsModal(false)}>Close</Button>
          </CenterMiddle>
        </div>
      }
      openModal={openPastRoundsModal}
      setOpenModal={setOpenPastRoundsModal}
    />
  );
};

export default PastRoundsModal;

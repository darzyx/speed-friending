import { Button, Divider, Header } from "semantic-ui-react";

import Participants from "./Participants";
import CenterMiddle from "../../components/blocks/CenterMiddle";
import StyledModal from "../../components/blocks/StyledModal";
import { GameType } from "./utils";

type PastRoundsModalPropsType = {
  game: GameType;
  activeRound: number;
  openPastRoundsModal: boolean;
  setOpenPastRoundsModal: (openPastRoundsModal: boolean) => void;
};
const PastRoundsModal = ({
  game,
  activeRound,
  openPastRoundsModal,
  setOpenPastRoundsModal,
}: PastRoundsModalPropsType) => {
  const pastRounds = Object.values(game).slice(0, Number(activeRound) - 1);

  return (
    <StyledModal
      header="Past Rounds"
      content={
        <div>
          {pastRounds
            .map((pastRound, index) => (
              <div key={index}>
                <Header as="h3" inverted textAlign="center">
                  {`Round ${index + 1}`}
                </Header>
                <Participants round={pastRound} />
                <Divider hidden={index === 0} />
              </div>
            ))
            .reverse()}
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

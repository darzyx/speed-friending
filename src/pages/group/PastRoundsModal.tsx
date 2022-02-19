import { Button, Divider, Header } from "semantic-ui-react";

import Participants from "./Participants";
import CenterMiddle from "../../components/blocks/CenterMiddle";
import StyledModal from "../../components/blocks/StyledModal";
import { GameType } from "./utils";
import { GroupWithIdType } from "../../types/group";

type PastRoundsModalPropsType = {
  game: GameType;
  activeRound: number;
  openPastRoundsModal: boolean;
  setOpenPastRoundsModal: (openPastRoundsModal: boolean) => void;
  group: GroupWithIdType;
};
const PastRoundsModal = ({
  game,
  activeRound,
  openPastRoundsModal,
  setOpenPastRoundsModal,
  group,
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
                  <Header as="h3" textAlign="center">
                    {`Round ${index + 1}`}
                  </Header>
                  <Participants round={pastRound} dropouts={group.dropouts} />
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
        <CenterMiddle>
          <Button onClick={() => setOpenPastRoundsModal(false)}>Close</Button>
        </CenterMiddle>
      }
      openModal={openPastRoundsModal}
      setOpenModal={setOpenPastRoundsModal}
    />
  );
};

export default PastRoundsModal;

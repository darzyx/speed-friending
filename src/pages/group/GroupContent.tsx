import { Divider, Icon } from "semantic-ui-react";

import { GameType, RoundType, TimeValuesType } from "./utils";
import { groupWithIdType } from "../../types/group";
import CenterMiddle from "../../components/blocks/CenterMiddle";
import TimeDisplay from "../../components/time/TimeDisplay";
import NavButton from "../../components/blocks/NavButton";
import Participants from "./Participants";
import HelpfulPrompt from "./HelpfulPrompt";
import PastRoundsModal from "./PastRoundsModal";

type GroupContentPropsType = {
  game: GameType;
  group: groupWithIdType;
  timeValues: TimeValuesType;
  activeRound: RoundType;
  openPastRoundsModal: boolean;
  setOpenPastRoundsModal: (openPastRoundsModal: boolean) => void;
  inverted: boolean;
};
const GroupContent = ({
  game,
  group,
  timeValues,
  activeRound,
  openPastRoundsModal,
  setOpenPastRoundsModal,
  inverted,
}: GroupContentPropsType) => (
  <div>
    <TimeDisplay timeValues={timeValues} group={group} inverted={inverted} />
    <Divider hidden />
    <HelpfulPrompt timeValues={timeValues} />
    <Participants
      round={activeRound}
      roundNumber={group.active_round_num}
      dropouts={group.dropouts}
      inverted={inverted}
    />
    <p style={{ textAlign: "center" }}>
      {`${group.participant_count - group.dropouts.length}` +
        `/${group.participant_count} participants`}
    </p>
    <Divider hidden />
    <CenterMiddle>
      <NavButton onClick={() => setOpenPastRoundsModal(true)}>
        <Icon name="history" /> Past Rounds
      </NavButton>
    </CenterMiddle>
    {openPastRoundsModal && (
      <PastRoundsModal
        game={game}
        group={group}
        openPastRoundsModal={openPastRoundsModal}
        setOpenPastRoundsModal={setOpenPastRoundsModal}
        inverted={inverted}
      />
    )}
  </div>
);

export default GroupContent;

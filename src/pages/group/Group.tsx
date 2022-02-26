import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Divider, Header, Icon } from "semantic-ui-react";
import { doc, setDoc } from "firebase/firestore";

import { db } from "../../firebase";
import { getGame, getTimeValues } from "./utils";
import { groupWithIdType } from "../../types/group";
import CenterMiddle from "../../components/blocks/CenterMiddle";
import TimeDisplay from "../../components/time/TimeDisplay";
import NavButton from "../../components/blocks/NavButton";
import PastRoundsModal from "./PastRoundsModal";
import Participants from "./Participants";
import AdminModal from "../../components/admin/AdminModal";
import { GroupNotFound } from "./Placeholders";
import HelpfulPrompt from "./HelpfulPrompt";
import { Loading } from "../../components/blocks/Loading";
import { initGroup } from "../../app/utils";

type GroupPropsType = {
  groups: groupWithIdType[];
  isGettingGroups: boolean;
  currentTimeInSeconds: number;
  userIsAdmin: boolean;
  playAlarmSound: () => void;
  inverted: boolean;
};
const Group = ({
  groups,
  isGettingGroups,
  currentTimeInSeconds,
  userIsAdmin,
  playAlarmSound,
  inverted,
}: GroupPropsType) => {
  // Reset scroll on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();

  // Makes sure we don't erroneously show 404 page
  const [waitForState, setWaitForState] = useState(true);
  const [group, setGroup] = useState(initGroup);
  useEffect(() => {
    if (!isGettingGroups) {
      const foundGroup = groups.find((s) => s.id === id);
      if (foundGroup) {
        setGroup(foundGroup);
      }
      setWaitForState(false);
    }
  }, [id, groups, isGettingGroups]);

  const [openPastRoundsModal, setOpenPastRoundsModal] = useState(false);

  const [openAdminModal, setOpenAdminModal] = useState(false);

  const game = getGame(group.participant_count, group.round_count);
  const activeRound = Object.values(game)[group.active_round_num - 1];
  const timeValues = getTimeValues({ group, currentTimeInSeconds });

  const [roundIsOver, setRoundIsOver] = useState(false);
  useEffect(() => {
    if (group?.id && timeValues.remainingTime <= 0 && !roundIsOver) {
      setRoundIsOver(true);
      playAlarmSound();
      const docRef = doc(db, "groups", group.id);
      const payload = { ...group, round_is_paused: true, round_paused_time: 0 };
      setDoc(docRef, payload);
    } else if (timeValues.remainingTime > 0 && roundIsOver) {
      setRoundIsOver(false);
    }
  }, [timeValues.remainingTime, roundIsOver, group, playAlarmSound]);

  if (isGettingGroups || waitForState) return <Loading inverted={inverted} />;
  if (!group?.id) return <GroupNotFound />;

  return (
    <div>
      {userIsAdmin && (
        <>
          <CenterMiddle>
            <Button onClick={() => setOpenAdminModal(true)} primary>
              <Icon name="settings" /> Manage Group
            </Button>
          </CenterMiddle>
          <AdminModal
            group={group}
            timeValues={timeValues}
            openAdminModal={openAdminModal}
            setOpenAdminModal={setOpenAdminModal}
            currentTimeInSeconds={currentTimeInSeconds}
            activeRound={activeRound}
            inverted={inverted}
          />
          <Divider hidden />
        </>
      )}
      <CenterMiddle textAlign="center">
        <Header
          as="h1"
          inverted={inverted}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "100%",
          }}
        >
          <Header.Subheader style={{ margin: "7px" }}>Group</Header.Subheader>
          {group.name}
        </Header>
      </CenterMiddle>
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
      <PastRoundsModal
        game={game}
        group={group}
        openPastRoundsModal={openPastRoundsModal}
        setOpenPastRoundsModal={setOpenPastRoundsModal}
        inverted={inverted}
      />
    </div>
  );
};

export default Group;

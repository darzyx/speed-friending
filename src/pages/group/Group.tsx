import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Divider, Header, Icon } from "semantic-ui-react";
import { doc, setDoc } from "firebase/firestore";

import { db } from "../../firebase";
import { getGame, getTimeValues } from "./utils";
import { GroupWithIdType } from "../../types/group";
import { initGroup } from "../../App";
import CenterMiddle from "../../components/blocks/CenterMiddle";
import TimeDisplay from "../../components/time/TimeDisplay";
import NavButton from "../../components/blocks/NavButton";
import PastRoundsModal from "./PastRoundsModal";
import Participants from "./Participants";
import AdminModal from "../../components/admin/AdminModal";
import { GroupNotFound, LoadingGroup } from "./Placeholders";
import HelpfulPrompt from "./HelpfulPrompt";

type GroupPropsType = {
  groups: GroupWithIdType[];
  isGettingGroups: boolean;
  currentTimeInSeconds: number;
  userIsAdmin: boolean;
};
const Group = ({
  groups,
  isGettingGroups,
  currentTimeInSeconds,
  userIsAdmin,
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
  const activeRound = Object.values(game)[Number(group.round_active) - 1];
  const timeValues = getTimeValues({ group, currentTimeInSeconds });

  const [roundIsOver, setRoundIsOver] = useState(false);
  useEffect(() => {
    if (group?.id && timeValues.remainingTime <= 0 && !roundIsOver) {
      setRoundIsOver(true);
      const docRef = doc(db, "groups", group.id);
      const payload = { ...group, round_is_paused: true, round_paused_time: 0 };
      setDoc(docRef, payload);
    } else if (timeValues.remainingTime > 0 && roundIsOver) {
      setRoundIsOver(false);
    }
  }, [timeValues.remainingTime, roundIsOver, group]);

  if (isGettingGroups || waitForState) return <LoadingGroup />;
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
          />
          <Divider hidden />
        </>
      )}
      <CenterMiddle textAlign="center">
        <Header
          inverted
          as="h1"
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
      <TimeDisplay timeValues={timeValues} group={group} />
      <Divider hidden />
      <HelpfulPrompt timeValues={timeValues} />
      <Participants
        round={activeRound}
        roundNumber={group.round_active}
        group={group}
      />
      <p style={{ textAlign: "center" }}>
        {`${group.participant_count - group.dropouts.length}` +
          `/${group.participant_count} group participants`}
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
        activeRound={group.round_active}
        openPastRoundsModal={openPastRoundsModal}
        setOpenPastRoundsModal={setOpenPastRoundsModal}
      />
    </div>
  );
};

export default Group;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Divider, Header, Icon } from "semantic-ui-react";
import { doc, setDoc } from "firebase/firestore";

import { db } from "../../firebase";
import { getGame, getTimeValues } from "./utils";
import { groupWithIdType } from "../../types/group";
import CenterMiddle from "../../components/blocks/CenterMiddle";
import AdminModal from "../../components/admin/AdminModal";
import CreatePrivateGroupModal from "./private-group/CreatePrivateGroupModal";
import { GroupNotFound } from "./Placeholders";
import Loading from "../../components/blocks/Loading";
import { initGroupWithId } from "../../app/utils";
import GroupContent from "./GroupContent";

type GroupPropsType = {
  groups: groupWithIdType[];
  privateGroups: groupWithIdType[];
  isGettingGroups: boolean;
  currentTimeInSeconds: number;
  userIsAdmin: boolean;
  playAlarmSound: () => void;
  inverted: boolean;
};
const Group = ({
  groups,
  privateGroups,
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
  const [group, setGroup] = useState(initGroupWithId);
  useEffect(() => {
    if (!isGettingGroups) {
      const foundGroup = groups.concat(privateGroups).find((s) => s.id === id);
      if (foundGroup) {
        setGroup(foundGroup);
      }
      setWaitForState(false);
    }
  }, [id, groups, privateGroups, isGettingGroups]);

  const [openPastRoundsModal, setOpenPastRoundsModal] = useState(false);

  const [openAdminModal, setOpenAdminModal] = useState(false);

  const [openCreatePrivateGroupModal, setOpenCreatePrivateGroupModal] =
    useState(false);

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

  const isPrivateUnfinishedGroup = group.private && !group.private_is_ready;

  return (
    <div>
      {userIsAdmin && (
        <>
          <CenterMiddle>
            <Button onClick={() => setOpenAdminModal(true)} primary>
              <Icon name="settings" /> Manage Group
            </Button>
          </CenterMiddle>
          {openAdminModal && (
            <AdminModal
              group={group}
              timeValues={timeValues}
              openAdminModal={openAdminModal}
              setOpenAdminModal={setOpenAdminModal}
              currentTimeInSeconds={currentTimeInSeconds}
              activeRound={activeRound}
              inverted={inverted}
            />
          )}
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
          <Header.Subheader style={{ margin: "7px" }}>
            {isPrivateUnfinishedGroup ? "Create" : "Group"}
          </Header.Subheader>
          {isPrivateUnfinishedGroup ? "New Private Group" : group.name}
        </Header>
      </CenterMiddle>
      {isPrivateUnfinishedGroup ? (
        <>
          <CenterMiddle>
            <Divider hidden />
            <Button
              onClick={() => setOpenCreatePrivateGroupModal(true)}
              labelPosition="right"
              primary
              icon
            >
              Click Here to Start <Icon name="plus" />
            </Button>
          </CenterMiddle>
          {openCreatePrivateGroupModal && (
            <CreatePrivateGroupModal
              group={group}
              openCreatePrivateGroupModal={openCreatePrivateGroupModal}
              setOpenCreatePrivateGroupModal={setOpenCreatePrivateGroupModal}
              inverted={inverted}
            />
          )}
        </>
      ) : (
        <GroupContent
          game={game}
          group={group}
          timeValues={timeValues}
          activeRound={activeRound}
          openPastRoundsModal={openPastRoundsModal}
          setOpenPastRoundsModal={setOpenPastRoundsModal}
          inverted={inverted}
        />
      )}
    </div>
  );
};

export default Group;

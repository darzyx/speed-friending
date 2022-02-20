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
  const { id } = useParams();

  const [group, setGroup] = useState(initGroup);
  const groupExists = group?.name?.length > 0;
  useEffect(() => {
    const foundGroup = groups.find((s) => s.id === id);
    if (foundGroup) {
      setGroup(foundGroup);
    }
  }, [id, groups]);

  const [openPastRoundsModal, setOpenPastRoundsModal] = useState(false);

  const [openAdminModal, setOpenAdminModal] = useState(false);

  const game = getGame(group.participant_count, group.round_count);
  const activeRound = Object.values(game)[Number(group.round_active) - 1];
  const timeValues = getTimeValues({ group, currentTimeInSeconds });

  const [roundIsOver, setRoundIsOver] = useState(false);
  useEffect(() => {
    if (groupExists && timeValues.remainingTime <= 0 && !roundIsOver) {
      setRoundIsOver(true);
      const docRef = doc(db, "groups", group.id);
      const payload = { ...group, round_is_paused: true, round_paused_time: 0 };
      setDoc(docRef, payload);
    } else if (timeValues.remainingTime > 0 && roundIsOver) {
      setRoundIsOver(false);
    }
  }, [timeValues.remainingTime, roundIsOver, group, groupExists]);

  if (isGettingGroups) return <LoadingGroup />;
  if (!groupExists) return <GroupNotFound />;

  return (
    <div>
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
          <Header.Subheader>
            {`${group.participant_count} participants`}
            <br />
            {`${group.round_count} rounds`}
          </Header.Subheader>
        </Header>
      </CenterMiddle>
      <Divider hidden />
      <TimeDisplay timeValues={timeValues} group={group} />
      {userIsAdmin && (
        <>
          <Divider hidden />
          <CenterMiddle>
            <Button onClick={() => setOpenAdminModal(true)} primary>
              <Icon name="sliders" /> Manage Group
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
        </>
      )}
      <Divider hidden />
      <Participants
        round={activeRound}
        dropouts={group.dropouts}
        currentTimeInSeconds={currentTimeInSeconds}
      />
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
        currentTimeInSeconds={currentTimeInSeconds}
      />
    </div>
  );
};

export default Group;

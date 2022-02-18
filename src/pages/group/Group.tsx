import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Divider, Header, Icon, Loader } from "semantic-ui-react";

import { getGame, getTimeValues } from "./utils";
import { GroupWithIdType } from "../../types/group";
import { initGroup } from "../../App";
import CenterMiddle from "../../components/blocks/CenterMiddle";
import TimeDisplay from "../../components/time/TimeDisplay";
import NavButton from "../../components/blocks/NavButton";
import PastRoundsModal from "./PastRoundsModal";
import Participants from "./Participants";
import AdminModal from "../../components/admin/AdminModal";

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
  const hasGroup = group?.name?.length > 0;
  useEffect(() => {
    const foundGroup = groups.find((s) => s.id === id);
    if (foundGroup) {
      setGroup(foundGroup);
    }
  }, [id, groups]);

  const timeValues = getTimeValues({ group, currentTimeInSeconds });

  const [openPastRoundsModal, setOpenPastRoundsModal] = useState(false);

  const [openAdminModal, setOpenAdminModal] = useState(false);

  if (isGettingGroups || !hasGroup) {
    return (
      <CenterMiddle style={{ minHeight: "50vh" }}>
        <Loader active inline="centered" size="huge" />
      </CenterMiddle>
    );
  }

  const game = getGame(group.participant_count, group.round_count);
  const activeRound = Object.values(game)[Number(group.round_active) - 1];

  return (
    <div>
      <CenterMiddle textAlign="center">
        <Header
          as="h1"
          inverted
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
          />
        </>
      )}
      <Divider hidden />
      <Participants round={activeRound} />
      <Divider hidden />
      <CenterMiddle>
        <NavButton onClick={() => setOpenPastRoundsModal(true)}>
          <Icon name="history" /> Past Rounds
        </NavButton>
      </CenterMiddle>
      <PastRoundsModal
        game={game}
        activeRound={group.round_active}
        openPastRoundsModal={openPastRoundsModal}
        setOpenPastRoundsModal={setOpenPastRoundsModal}
        group={group}
      />
    </div>
  );
};

export default Group;

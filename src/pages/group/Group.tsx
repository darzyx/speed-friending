import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Dimmer, Divider, Header, Icon, Loader } from "semantic-ui-react";

import { getGame, getTimeValues } from "./utils";
import { GroupWithIdType } from "../../types/group";
import { initGroup } from "../../App";
import CenterMiddle from "../../components/blocks/CenterMiddle";
import TimeDisplay from "../../components/time/TimeDisplay";
import ManageTimeModal from "../../components/time/ManageTimeModal";
import NavButton from "../../components/blocks/NavButton";
import PastRoundsModal from "./PastRoundsModal";
import Participants from "./Participants";

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

  const [openTimeModal, setOpenTimeModal] = useState(false);
  const timeValues = getTimeValues({ group, currentTimeInSeconds });

  const [openPastRoundsModal, setOpenPastRoundsModal] = useState(false);

  if (isGettingGroups || !hasGroup) {
    return (
      <Dimmer active>
        <Loader size="big">Loading...</Loader>
      </Dimmer>
    );
  }

  const game = getGame(group.participant_count, group.round_count);
  const activeRound = Object.values(game)[Number(group.round_active) - 1];

  return (
    <div>
      <CenterMiddle textAlign="center">
        <Header as="h1" inverted>
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
      <TimeDisplay
        userIsAdmin={userIsAdmin}
        group={group}
        timeValues={timeValues}
        setOpenTimeModal={setOpenTimeModal}
      />
      <ManageTimeModal
        userIsAdmin={userIsAdmin}
        group={group}
        timeValues={timeValues}
        openTimeModal={openTimeModal}
        setOpenTimeModal={setOpenTimeModal}
      />
      <Divider hidden />
      <Participants round={activeRound} />
      <Divider hidden />
      <CenterMiddle>
        <NavButton onClick={() => setOpenPastRoundsModal(true)}>
          <Icon name="history" /> View Past Rounds
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

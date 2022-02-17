import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Dimmer,
  Divider,
  Grid,
  Header,
  Icon,
  Loader,
} from "semantic-ui-react";

import { db } from "../../firebase";
import { getGame, getTimeValues } from "./utils";
import { GroupWithIdType } from "../../types/group";
import { initGroup } from "../../App";
import CenterMiddle from "../../components/blocks/CenterMiddle";
import TimeDisplay from "../../components/time/TimeDisplay";
import ManageTimeModal from "../../components/time/ManageTimeModal";
import NavButton from "../../components/blocks/NavButton";
import PastRoundsModal from "./PastRoundsModal";
import Participants from "./Participants";
import StyledModal from "../../components/blocks/StyledModal";
import { deleteDoc, doc } from "firebase/firestore";

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

  const navigate = useNavigate();

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

  const [isDeleting, setIsDeleting] = useState(false);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const handleDeleteGroup = async () => {
    setIsDeleting(true);
    const docRef = doc(db, "groups", group.id);

    await deleteDoc(docRef);

    setOpenConfirmDeleteModal(false);
    setIsDeleting(false);
    navigate("/home");
  };

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
        {userIsAdmin && (
          <>
            <Button
              style={{ marginTop: "10px", minWidth: "175px" }}
              color="grey"
              size="small"
            >
              <Icon name="remove user" /> Remove Participant
            </Button>
            <Button
              onClick={() => setOpenConfirmDeleteModal(true)}
              style={{ marginTop: "10px", minWidth: "175px" }}
              color="red"
              size="small"
            >
              <Icon name="close" /> Delete Group
            </Button>
            <StyledModal
              header="Delete"
              subheader={group.name}
              content={
                <p style={{ textAlign: "center" }}>This cannot be undone</p>
              }
              actions={
                <Grid inverted>
                  <Grid.Row columns={2}>
                    <Grid.Column textAlign="right" verticalAlign="middle">
                      <Button onClick={() => setOpenConfirmDeleteModal(false)}>
                        Cancel
                      </Button>
                    </Grid.Column>
                    <Grid.Column textAlign="left" verticalAlign="middle">
                      <Button
                        onClick={handleDeleteGroup}
                        disabled={isDeleting}
                        loading={isDeleting}
                        negative
                      >
                        Delete
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              }
              openModal={openConfirmDeleteModal}
              setOpenModal={setOpenConfirmDeleteModal}
            />
          </>
        )}
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

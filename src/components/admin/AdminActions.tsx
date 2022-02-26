import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { Button, Divider, Grid, Header, Icon } from "semantic-ui-react";
import { useLocation, useNavigate } from "react-router-dom";

import { db } from "../../firebase";
import { groupWithIdType } from "../../types/group";
import { RoundType, TimeValuesType } from "../../pages/group/utils";
import { useState } from "react";
import AdminConfirmModal from "./AdminConfirmModal";
import AdminDropoutModal from "./AdminDropoutModal";

type AdminActionsPropsType = {
  group: groupWithIdType;
  timeValues: TimeValuesType;
  setOpenAdminModal: (openAdminModal: boolean) => void;
  currentTimeInSeconds: number;
  activeRound: RoundType;
  darkMode: boolean;
};
const AdminActions = ({
  group,
  timeValues,
  setOpenAdminModal,
  currentTimeInSeconds,
  activeRound,
  darkMode,
}: AdminActionsPropsType) => {
  const location = useLocation();
  const navigate = useNavigate();

  const docRef = doc(db, "groups", group.id);

  const handleReset = () => {
    const payload = {
      ...group,
      round_end_time: currentTimeInSeconds + group.round_duration,
      round_is_paused: true,
      round_paused_time: group.round_duration,
    };
    setDoc(docRef, payload);
  };

  const handleAdd30Seconds = () => {
    if (group.round_is_paused) {
      const payload = {
        ...group,
        round_paused_time: Math.min(
          group.round_paused_time + 30,
          group.round_duration
        ),
      };
      setDoc(docRef, payload);
    } else {
      const newRoundEndTime = group.round_end_time + 30;
      if (newRoundEndTime - currentTimeInSeconds < group.round_duration) {
        const payload = { ...group, round_end_time: newRoundEndTime };
        setDoc(docRef, payload);
      } else {
        const payload = {
          ...group,
          round_end_time: currentTimeInSeconds + group.round_duration,
        };
        setDoc(docRef, payload);
      }
    }
  };

  const handleSubtract30Seconds = () => {
    if (group.round_is_paused) {
      const payload = {
        ...group,
        round_paused_time: Math.max(group.round_paused_time - 30, 0),
      };
      setDoc(docRef, payload);
    } else {
      const newRoundEndTime = group.round_end_time - 30;
      if (newRoundEndTime > currentTimeInSeconds) {
        const payload = { ...group, round_end_time: newRoundEndTime };
        setDoc(docRef, payload);
      } else {
        const payload = { ...group, round_end_time: currentTimeInSeconds };
        setDoc(docRef, payload);
      }
    }
  };

  const handleToggleStart = () => {
    if (group.round_is_paused) {
      const payload = {
        ...group,
        round_end_time: currentTimeInSeconds + group.round_paused_time,
        round_is_paused: false,
      };
      const docRef = doc(db, "groups", group.id);
      setDoc(docRef, payload);
    } else {
      const payload = {
        ...group,
        round_is_paused: true,
        round_paused_time: group.round_end_time - currentTimeInSeconds,
      };
      setDoc(docRef, payload);
    }
  };

  const handleNextRound = () => {
    if (group.active_round_num < group.round_count) {
      const payload = {
        ...group,
        active_round_num: group.active_round_num + 1,
        round_end_time: currentTimeInSeconds + group.round_duration,
        round_is_paused: true,
        round_paused_time: group.round_duration,
      };
      setDoc(docRef, payload);
    } else {
      const payload = {
        ...group,
        round_end_time: currentTimeInSeconds,
        round_is_paused: true,
        round_paused_time: 0,
      };
      setDoc(docRef, payload);
    }
  };

  const handlePrevRound = () => {
    if (group.active_round_num > 1) {
      const payload = {
        ...group,
        active_round_num: group.active_round_num - 1,
        round_end_time: currentTimeInSeconds + group.round_duration,
        round_is_paused: true,
        round_paused_time: group.round_duration,
      };
      setDoc(docRef, payload);
    }
  };

  const handleDeleteGroup = async () => {
    await deleteDoc(docRef);
    if (location.pathname !== "/home") navigate("/home");
  };

  const [confirmingAction, setConfirmingAction] = useState("");
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const handleCancelAction = () => {
    setConfirmingAction("");
    setOpenConfirmModal(false);
  };
  const handleConfirmAction = () => {
    if (confirmingAction === "reset") {
      handleReset();
    } else if (confirmingAction === "next_round") {
      handleNextRound();
    } else if (confirmingAction === "prev_round") {
      handlePrevRound();
    } else if (confirmingAction === "delete") {
      handleDeleteGroup();
    }
    setConfirmingAction("");
    setOpenConfirmModal(false);
  };

  const [openDropoutModal, setOpenDropoutModal] = useState(false);

  const outOfTime = timeValues.remainingTime <= 0;

  return (
    <div>
      <Header inverted={darkMode} as="h3" textAlign="center">
        Time
      </Header>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Button
              onClick={() => {
                setConfirmingAction("reset");
                setOpenConfirmModal(true);
              }}
              color="grey"
              fluid
            >
              <Icon name="repeat" /> Reset
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Button
              disabled={outOfTime}
              onClick={handleToggleStart}
              positive={group.round_is_paused || outOfTime}
              negative={!group.round_is_paused && !outOfTime}
              fluid
            >
              {group.round_is_paused || outOfTime ? (
                <>
                  <Icon name="play" /> Start
                </>
              ) : (
                <>
                  <Icon name="stop" /> Pause
                </>
              )}
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Grid.Column>
              <Button onClick={handleSubtract30Seconds} color="pink" fluid>
                <Icon name="minus circle" /> -30s
              </Button>
            </Grid.Column>
          </Grid.Column>
          <Grid.Column>
            <Grid.Column>
              <Button onClick={handleAdd30Seconds} color="teal" fluid>
                <Icon name="plus circle" /> +30s
              </Button>
            </Grid.Column>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
      <Header
        as="h3"
        textAlign="center"
        inverted={darkMode}
        style={{ marginTop: "0" }}
      >
        Round
      </Header>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Button
              onClick={() => {
                setConfirmingAction("prev_round");
                setOpenConfirmModal(true);
              }}
              disabled={group.active_round_num <= 1}
              primary
              fluid
            >
              <Icon name="backward" style={{ margin: "0 0 5px 0" }} />
              <br />
              Prev Round
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Button
              onClick={() => {
                setConfirmingAction("next_round");
                setOpenConfirmModal(true);
              }}
              disabled={group.active_round_num >= group.round_count}
              primary
              fluid
            >
              <Icon name="forward" style={{ margin: "0 0 5px 0" }} />
              <br />
              Next Round
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
      <Header
        as="h3"
        textAlign="center"
        inverted={darkMode}
        style={{ marginTop: "0" }}
      >
        Advanced
      </Header>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Button
              onClick={() => setOpenDropoutModal(true)}
              color="purple"
              fluid
            >
              <Icon name="remove user" /> Dropout
            </Button>
            <AdminDropoutModal
              group={group}
              openDropoutModal={openDropoutModal}
              setOpenDropoutModal={setOpenDropoutModal}
              activeRound={activeRound}
              darkMode={darkMode}
            />
          </Grid.Column>
          <Grid.Column>
            <Button
              onClick={() => {
                setConfirmingAction("delete");
                setOpenConfirmModal(true);
              }}
              color="red"
              fluid
            >
              <Icon name="remove" /> Delete
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column textAlign="center">
            <Button onClick={() => setOpenAdminModal(false)}>Close</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <AdminConfirmModal
        confirmingAction={confirmingAction}
        onCancelAction={handleCancelAction}
        onConfirmAction={handleConfirmAction}
        openConfirmModal={openConfirmModal}
        setOpenConfirmModal={setOpenConfirmModal}
        darkMode={darkMode}
      />
    </div>
  );
};

export default AdminActions;

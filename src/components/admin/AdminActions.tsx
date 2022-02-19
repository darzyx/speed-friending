import { deleteDoc, doc, setDoc, Timestamp } from "firebase/firestore";
import { Button, Divider, Grid, Icon } from "semantic-ui-react";
import { useLocation, useNavigate } from "react-router-dom";

import { db } from "../../firebase";
import { GroupWithIdType } from "../../types/group";
import { RoundType, TimeValuesType } from "../../pages/group/utils";
import { useState } from "react";
import CenterMiddle from "../blocks/CenterMiddle";
import ConfirmModal from "./ConfirmModal";
import DropoutModal from "./DropoutModal";

type AdminActionsPropsType = {
  group: GroupWithIdType;
  timeValues: TimeValuesType;
  setOpenAdminModal: (openAdminModal: boolean) => void;
  activeRound: RoundType;
};
const AdminActions = ({
  group,
  timeValues,
  setOpenAdminModal,
  activeRound,
}: AdminActionsPropsType) => {
  const location = useLocation();
  const navigate = useNavigate();

  const docRef = doc(db, "groups", group.id);

  const handleReset = () => {
    const payload = {
      ...group,
      round_end_time: Timestamp.now().seconds + group.round_duration,
      round_is_paused: true,
      round_paused_time: group.round_duration,
    };
    setDoc(docRef, payload);
  };

  const handleToggleStart = () => {
    if (group.round_is_paused) {
      const payload = {
        ...group,
        round_end_time: Timestamp.now().seconds + group.round_paused_time,
        round_is_paused: false,
      };
      const docRef = doc(db, "groups", group.id);
      setDoc(docRef, payload);
    } else {
      const payload = {
        ...group,
        round_is_paused: true,
        round_paused_time: group.round_end_time - Timestamp.now().seconds,
      };
      setDoc(docRef, payload);
    }
  };

  const handleEndRound = () => {
    if (group.round_active < group.round_count) {
      const payload = {
        ...group,
        round_active: group.round_active + 1,
        round_end_time: Timestamp.now().seconds + group.round_duration,
        round_is_paused: true,
        round_paused_time: group.round_duration,
      };
      setDoc(docRef, payload);
    } else {
      const payload = {
        ...group,
        round_end_time: Timestamp.now().seconds,
        round_is_paused: true,
        round_paused_time: 0,
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
    } else if (confirmingAction === "end_round") {
      handleEndRound();
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
        <Grid.Row columns={1}>
          <Grid.Column>
            <Button
              onClick={() => {
                setConfirmingAction("end_round");
                setOpenConfirmModal(true);
              }}
              primary
              fluid
            >
              <Icon name="flag checkered" /> End Round
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Button
              onClick={() => setOpenDropoutModal(true)}
              color="yellow"
              fluid
            >
              <Icon name="remove user" /> Dropout
            </Button>
            <DropoutModal
              group={group}
              openDropoutModal={openDropoutModal}
              setOpenDropoutModal={setOpenDropoutModal}
              activeRound={activeRound}
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
              <Icon name="close" /> Delete
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
      <CenterMiddle>
        <Button onClick={() => setOpenAdminModal(false)}>Close</Button>
      </CenterMiddle>
      <Divider hidden />
      <ConfirmModal
        confirmingAction={confirmingAction}
        onCancelAction={handleCancelAction}
        onConfirmAction={handleConfirmAction}
        openConfirmModal={openConfirmModal}
        setOpenConfirmModal={setOpenConfirmModal}
      />
    </div>
  );
};

export default AdminActions;

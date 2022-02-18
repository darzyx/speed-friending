import { doc, setDoc, Timestamp } from "firebase/firestore";

import { db } from "../../firebase";
import StyledModal from "../blocks/StyledModal";
import { GroupWithIdType } from "../../types/group";
import { TimeValuesType } from "../../pages/group/utils";
import { useState } from "react";
import { Button, Grid, Icon } from "semantic-ui-react";

type ConfirmTimeActionModalPropsType = {
  confirmingAction: string;
  onCancelAction: () => void;
  onConfirmAction: () => void;
  openConfirmModal: boolean;
  setOpenConfirmModal: (openConfirmModal: boolean) => void;
};
const ConfirmTimeActionModal = ({
  confirmingAction,
  onCancelAction,
  onConfirmAction,
  openConfirmModal,
  setOpenConfirmModal,
}: ConfirmTimeActionModalPropsType) => (
  <StyledModal
    header="Are you sure?"
    subheader="Confirm"
    content={
      <p style={{ textAlign: "center" }}>
        {confirmingAction === "reset"
          ? "You are about to reset the round time"
          : confirmingAction === "end_round"
          ? "You are about to end the round"
          : "Please confirm your action"}
      </p>
    }
    actions={
      <Grid inverted>
        <Grid.Row columns={2}>
          <Grid.Column textAlign="right" verticalAlign="middle">
            <Button onClick={onCancelAction}>Cancel</Button>
          </Grid.Column>
          <Grid.Column textAlign="left" verticalAlign="middle">
            <Button primary onClick={onConfirmAction}>
              Confirm
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    }
    openModal={openConfirmModal}
    setOpenModal={setOpenConfirmModal}
  />
);

type TimeDisplayControlsPropsType = {
  group: GroupWithIdType;
  timeValues: TimeValuesType;
};
const TimeDisplayControls = ({
  group,
  timeValues,
}: TimeDisplayControlsPropsType) => {
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
    }
    setConfirmingAction("");
    setOpenConfirmModal(false);
  };

  const outOfTime = timeValues.remainingTime <= 0;

  return (
    <div>
      <Grid inverted>
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
      </Grid>
      <ConfirmTimeActionModal
        confirmingAction={confirmingAction}
        onCancelAction={handleCancelAction}
        onConfirmAction={handleConfirmAction}
        openConfirmModal={openConfirmModal}
        setOpenConfirmModal={setOpenConfirmModal}
      />
    </div>
  );
};

export default TimeDisplayControls;
import { doc, setDoc, Timestamp } from "firebase/firestore";

import { db } from "../../firebase";
import StyledModal from "../blocks/StyledModal";
import { GroupWithIdType } from "../../types/group";
import TimeDisplay from "./TimeDisplay";
import ManageTimeActions from "./ManageTimeActions";
import { TimeValuesType } from "../../pages/group/utils";
import { useState } from "react";
import { Button, Grid } from "semantic-ui-react";

type ManageTimeModalPropsType = {
  userIsAdmin: boolean;
  group: GroupWithIdType;
  timeValues: TimeValuesType;
  openTimeModal: boolean;
  setOpenTimeModal: (openTimeModal: boolean) => void;
};
const ManageTimeModal = ({
  userIsAdmin,
  group,
  timeValues,
  openTimeModal,
  setOpenTimeModal,
}: ManageTimeModalPropsType) => {
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

  return (
    <StyledModal
      header={group.name}
      subheader="Manage time for"
      content={
        <div>
          <TimeDisplay group={group} timeValues={timeValues} />
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
                    <Button onClick={handleCancelAction}>Cancel</Button>
                  </Grid.Column>
                  <Grid.Column textAlign="left" verticalAlign="middle">
                    <Button primary onClick={handleConfirmAction}>
                      Confirm
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            }
            openModal={openConfirmModal}
            setOpenModal={setOpenConfirmModal}
          />
        </div>
      }
      actions={
        <ManageTimeActions
          group={group}
          onClickReset={() => {
            setConfirmingAction("reset");
            setOpenConfirmModal(true);
          }}
          onClickToggleStart={handleToggleStart}
          onClickEndRound={() => {
            setConfirmingAction("end_round");
            setOpenConfirmModal(true);
          }}
          setOpenTimeModal={setOpenTimeModal}
          timeValues={timeValues}
        />
      }
      openModal={openTimeModal}
      setOpenModal={setOpenTimeModal}
    />
  );
};

export default ManageTimeModal;

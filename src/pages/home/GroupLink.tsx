import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { Button, Label } from "semantic-ui-react";

import { getGame, getTimeValues, TimeValuesType } from "../group/utils";
import { GroupWithIdType } from "../../types/group";
import AdminModal from "../../components/admin/AdminModal";
import { db } from "../../firebase";

type TimeLabelPropsType = {
  timeValues: TimeValuesType;
  onClickTimeLabel: (openTimeModal: boolean) => void;
  userIsAdmin: boolean;
};
const TimeLabel = ({
  timeValues,
  onClickTimeLabel,
  userIsAdmin,
}: TimeLabelPropsType) => (
  <Label
    onClick={() => onClickTimeLabel(true)}
    {...(userIsAdmin && { color: timeValues.color })}
  >
    {`${timeValues.remainingMinutesDisplay}:${timeValues.remainingSecondsDisplay}`}
  </Label>
);

type GroupLinkPropsType = {
  index: number;
  group: GroupWithIdType;
  currentTimeInSeconds: number;
  userIsAdmin: boolean;
};
const GroupLink = ({
  index,
  group,
  currentTimeInSeconds,
  userIsAdmin,
}: GroupLinkPropsType) => {
  const navigate = useNavigate();

  const [openAdminModal, setOpenAdminModal] = useState(false);

  const handleClickTimeLabel = (newOpenAdminModal: boolean) => {
    if (userIsAdmin) {
      setOpenAdminModal(newOpenAdminModal);
    } else {
      navigate(`/group/${group.id}`);
    }
  };

  const game = getGame(group.participant_count, group.round_count);
  const activeRound = Object.values(game)[Number(group.round_active) - 1];
  const timeValues = getTimeValues({ group, currentTimeInSeconds });

  const [roundIsOver, setRoundIsOver] = useState(false);
  useEffect(() => {
    if (timeValues.remainingTime <= 0 && !roundIsOver) {
      setRoundIsOver(true);
      const docRef = doc(db, "groups", group.id);
      const payload = { ...group, round_is_paused: true, round_paused_time: 0 };
      setDoc(docRef, payload);
    } else if (timeValues.remainingTime > 0 && roundIsOver) {
      setRoundIsOver(false);
    }
  }, [timeValues.remainingTime, roundIsOver, group]);

  return (
    <Button
      as="div"
      style={{
        width: "100%",
        maxWidth: "600px",
        marginTop: index === 0 ? "0" : "10px",
      }}
      size="large"
      labelPosition="right"
    >
      <Button
        as={Link}
        to={`/group/${group.id}`}
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          textAlign: "left",
          padding: "15px 5px 15px 20px",
        }}
        fluid
      >
        {group.name}
      </Button>
      <TimeLabel
        timeValues={timeValues}
        onClickTimeLabel={handleClickTimeLabel}
        userIsAdmin={userIsAdmin}
      />
      <AdminModal
        group={group}
        timeValues={timeValues}
        openAdminModal={openAdminModal}
        setOpenAdminModal={setOpenAdminModal}
        currentTimeInSeconds={currentTimeInSeconds}
        activeRound={activeRound}
      />
    </Button>
  );
};

export default GroupLink;

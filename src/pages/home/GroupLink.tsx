import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { Button, Label } from "semantic-ui-react";
import styled from "styled-components";

import { getGame, getTimeValues, TimeValuesType } from "../group/utils";
import { groupWithIdType } from "../../types/group";
import AdminModal from "../../components/admin/AdminModal";
import { db } from "../../firebase";

const StyledLabel = styled(Label)`
  &&&& {
    background-color: ${({ theme }) => theme.color.four};
    color: ${({ theme }) => theme.color.text};
  }
`;

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
  <StyledLabel
    onClick={() => onClickTimeLabel(true)}
    {...(userIsAdmin && { color: timeValues.color })}
  >
    {`${timeValues.remainingMinutesDisplay}:${timeValues.remainingSecondsDisplay}`}
  </StyledLabel>
);

const ButtonLink = styled(Button).attrs((props) => ({
  to: props.to,
  as: Link,
  fluid: true,
}))`
  &&&& {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    padding: 15px 5px 15px 20px;
    background-color: ${({ theme }) => theme.color.four};
    color: ${({ theme }) => theme.color.text};
  }
`;

type GroupLinkPropsType = {
  index: number;
  group: groupWithIdType;
  currentTimeInSeconds: number;
  userIsAdmin: boolean;
  playAlarmSound: () => void;
  inverted: boolean;
};
const GroupLink = ({
  index,
  group,
  currentTimeInSeconds,
  userIsAdmin,
  playAlarmSound,
  inverted,
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
  const activeRound = Object.values(game)[Number(group.active_round_num) - 1];
  const timeValues = getTimeValues({ group, currentTimeInSeconds });

  const [roundIsOver, setRoundIsOver] = useState(false);
  useEffect(() => {
    if (timeValues.remainingTime <= 0 && !roundIsOver) {
      setRoundIsOver(true);
      if (userIsAdmin) playAlarmSound();
      const docRef = doc(db, "groups", group.id);
      const payload = { ...group, round_is_paused: true, round_paused_time: 0 };
      setDoc(docRef, payload);
    } else if (timeValues.remainingTime > 0 && roundIsOver) {
      setRoundIsOver(false);
    }
  }, [
    timeValues.remainingTime,
    roundIsOver,
    group,
    userIsAdmin,
    playAlarmSound,
  ]);

  return (
    <Button
      as="div"
      style={{ width: "100%", margin: `${index === 0 ? "0" : "10px"} 0 0 0` }}
      labelPosition="right"
    >
      <ButtonLink to={`/group/${group.id}`}>{group.name}</ButtonLink>
      <TimeLabel
        timeValues={timeValues}
        onClickTimeLabel={handleClickTimeLabel}
        userIsAdmin={userIsAdmin}
      />
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
    </Button>
  );
};

export default GroupLink;

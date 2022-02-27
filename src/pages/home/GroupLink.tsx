import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Button, Label } from "semantic-ui-react";
import styled from "styled-components";

import { getGame, getTimeValues, TimeValuesType } from "../group/utils";
import { groupWithIdType } from "../../types/group";
import AdminModal from "../../components/admin/AdminModal";
import { db } from "../../firebase";
import GroupButtonLink from "./GroupButtonLink";

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

type GroupLinkPropsType = {
  index: number;
  group: groupWithIdType;
  currentTimeInSeconds: number;
  userIsAdmin: boolean;
  playStartSfxIfUnmute: () => void;
  playAlmostSfxIfUnmute: () => void;
  playFinishSfxIfUnmute: () => void;
  inverted: boolean;
};
const GroupLink = ({
  index,
  group,
  currentTimeInSeconds,
  userIsAdmin,
  playStartSfxIfUnmute,
  playAlmostSfxIfUnmute,
  playFinishSfxIfUnmute,
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
    if (
      userIsAdmin &&
      group?.id &&
      timeValues.remainingTime < 31 &&
      timeValues.remainingTime > 28 &&
      !group.round_is_paused
    ) {
      playAlmostSfxIfUnmute();
    } else if (
      group?.id &&
      timeValues.remainingTime >= group.round_duration - 2 &&
      !group.round_is_paused
    ) {
      playStartSfxIfUnmute();
    } else if (timeValues.remainingTime <= 0 && !roundIsOver) {
      setRoundIsOver(true);
      if (userIsAdmin) playFinishSfxIfUnmute();
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
    playStartSfxIfUnmute,
    playAlmostSfxIfUnmute,
    playFinishSfxIfUnmute,
  ]);

  return (
    <Button
      as="div"
      style={{ width: "100%", margin: `${index === 0 ? "0" : "10px"} 0 0 0` }}
      labelPosition="right"
    >
      <GroupButtonLink to={`/group/${group.id}`}>{group.name}</GroupButtonLink>
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

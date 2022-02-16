import { Link, useNavigate } from "react-router-dom";
import { Button, Label } from "semantic-ui-react";
import { getTimeValues, TimeValuesType } from "../session/utils";
import { SessionWithIdType } from "../../types/session";
import ManageTimeModal from "../../components/time/ManageTimeModal";
import { useState } from "react";

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
    {...(userIsAdmin
      ? { color: timeValues.color }
      : {
          style: {
            backgroundColor: "#27292a",
            color: "rgba(255, 255, 255, 0.9)",
          },
        })}
  >
    {`${timeValues.remainingMinutesDisplay}:${timeValues.remainingSecondsDisplay}`}
  </Label>
);

type SessionLinkPropsType = {
  index: number;
  session: SessionWithIdType;
  currentTimeInSeconds: number;
  userIsAdmin: boolean;
};
const SessionLink = ({
  index,
  session,
  currentTimeInSeconds,
  userIsAdmin,
}: SessionLinkPropsType) => {
  const navigate = useNavigate();

  const [openTimeModal, setOpenTimeModal] = useState(false);

  const handleClickTimeLabel = (newOpenTimeLabel: boolean) => {
    if (userIsAdmin) {
      setOpenTimeModal(newOpenTimeLabel);
    } else {
      navigate(`/session/${session.id}`);
    }
  };

  const timeValues = getTimeValues({ session, currentTimeInSeconds });

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
        to={`/session/${session.id}`}
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          textAlign: "left",
          paddingTop: "15px",
          paddingBottom: "15px",
          paddingRight: "0",
        }}
        secondary
        active
        fluid
      >
        {session.name}
      </Button>
      <TimeLabel
        timeValues={timeValues}
        onClickTimeLabel={handleClickTimeLabel}
        userIsAdmin={userIsAdmin}
      />
      <ManageTimeModal
        userIsAdmin={userIsAdmin}
        session={session}
        timeValues={timeValues}
        openTimeModal={openTimeModal}
        setOpenTimeModal={setOpenTimeModal}
      />
    </Button>
  );
};

export default SessionLink;

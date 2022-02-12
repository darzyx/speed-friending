import { Link, useNavigate } from "react-router-dom";
import { Button, Label } from "semantic-ui-react";
import { getTimeValues } from "../session/utils";
import { SessionType, SessionWithIdType } from "../../types/session";
import TimeModal from "../../components/time-modal/TimeModal";
import { useState } from "react";

type TimeLabelPropsType = {
  session: SessionType;
  currentTimeInSeconds: number;
  onClickTimeLabel: (openTimeModal: boolean) => void;
  userIsAdmin: boolean;
};
const TimeLabel = ({
  session,
  currentTimeInSeconds,
  onClickTimeLabel,
  userIsAdmin,
}: TimeLabelPropsType) => {
  const timeValues = getTimeValues({ session, currentTimeInSeconds });

  return (
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
      {`${timeValues.remainingMinutes}:${timeValues.remainingSeconds}`}
    </Label>
  );
};

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
        style={{ textAlign: "left", paddingTop: "15px", paddingBottom: "15px" }}
        secondary
        active
        fluid
      >
        {session.name}
      </Button>
      <TimeLabel
        session={session}
        currentTimeInSeconds={currentTimeInSeconds}
        onClickTimeLabel={handleClickTimeLabel}
        userIsAdmin={userIsAdmin}
      />
      <TimeModal
        session={session}
        openTimeModal={openTimeModal}
        setOpenTimeModal={setOpenTimeModal}
      />
    </Button>
  );
};

export default SessionLink;

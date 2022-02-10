import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";
import { getTimeValues } from "../session/utils";
import { SessionType, SessionWithIdType } from "../../types/session";
import TimeModal from "../../components/time-modal/TimeModal";
import { useState } from "react";

type TimeLabelPropsType = {
  session: SessionType;
  currentTimeInSeconds: number;
  setOpenTimeModal: (openTimeModal: boolean) => void;
};
const TimeLabel = ({
  session,
  currentTimeInSeconds,
  setOpenTimeModal,
}: TimeLabelPropsType) => {
  const timeValues = getTimeValues({ session, currentTimeInSeconds });
  return (
    <Label color={timeValues.color} onClick={() => setOpenTimeModal(true)}>
      {`${timeValues.remainingMinutes}:${timeValues.remainingSeconds}`}
    </Label>
  );
};

type SessionLinkPropsType = {
  index: number;
  session: SessionWithIdType;
  currentTimeInSeconds: number;
};
const SessionLink = ({
  index,
  session,
  currentTimeInSeconds,
}: SessionLinkPropsType) => {
  const [openTimeModal, setOpenTimeModal] = useState(false);

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
        fluid
      >
        {session.name} <Icon name="arrow right" />
      </Button>
      <TimeLabel
        session={session}
        currentTimeInSeconds={currentTimeInSeconds}
        setOpenTimeModal={setOpenTimeModal}
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

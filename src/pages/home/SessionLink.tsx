import { Link } from "react-router-dom";
import { Button, Label } from "semantic-ui-react";
import { getTimeValues } from "../session/utils";
import { SessionType, SessionWithIdType } from "../../types/session";

type TimeLabelPropsType = {
  session: SessionType;
  currentTimeInSeconds: number;
};
const TimeLabel = ({ session, currentTimeInSeconds }: TimeLabelPropsType) => {
  const timeValues = getTimeValues({ session, currentTimeInSeconds });
  return (
    <Label color={timeValues.color}>
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
}: SessionLinkPropsType) => (
  <Button
    as={Link}
    to={`/session/${session.id}`}
    key={session.id}
    style={{
      width: "100%",
      maxWidth: "600px",
      marginTop: index === 0 ? "0" : "10px",
    }}
    size="large"
    labelPosition="right"
  >
    <Button
      secondary
      style={{
        width: "100%",
        maxWidth: "600px",
        textAlign: "left",
      }}
    >
      {session.name}
    </Button>
    <TimeLabel session={session} currentTimeInSeconds={currentTimeInSeconds} />
  </Button>
);

export default SessionLink;

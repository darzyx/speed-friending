import { Button, Icon } from "semantic-ui-react";
import { SessionWithIdType } from "../../types/session";

const maxSessions = 50;

type CreateSessionLinkPropsType = {
  isGettingSessions: boolean;
  hasAnySessions: boolean;
  sessions: SessionWithIdType[];
  setOpenNewModal: (arg: boolean) => void;
};

const CreateSessionLink = ({
  isGettingSessions,
  hasAnySessions,
  sessions,
  setOpenNewModal,
}: CreateSessionLinkPropsType) => {
  const disableNewSession = isGettingSessions || sessions.length >= maxSessions;
  return (
    <Button
      style={{
        width: "100%",
        maxWidth: "600px",
        marginTop: hasAnySessions ? "10px" : "0",
      }}
      onClick={disableNewSession ? () => {} : () => setOpenNewModal(true)}
      disabled={disableNewSession}
      size="large"
      secondary
    >
      {sessions.length >= maxSessions ? (
        <Icon name="close" />
      ) : (
        <Icon name="plus" />
      )}
    </Button>
  );
};

export default CreateSessionLink;

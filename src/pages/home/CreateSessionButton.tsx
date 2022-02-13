import { Button, Icon } from "semantic-ui-react";
import { SessionWithIdType } from "../../types/session";

// TODO: remove this and limit creation to auth users
const maxSessions = 50;

type CreateSessionButtonPropsType = {
  hasAnySessions: boolean;
  sessions: SessionWithIdType[];
  setOpenNewModal: (arg: boolean) => void;
};

const CreateSessionButton = ({
  hasAnySessions,
  sessions,
  setOpenNewModal,
}: CreateSessionButtonPropsType) => {
  const disabled = sessions.length >= maxSessions;
  return (
    <Button
      style={{
        width: "100%",
        maxWidth: "600px",
        marginTop: hasAnySessions ? "10px" : "0",
        paddingTop: "15px",
        paddingBottom: "15px",
      }}
      onClick={disabled ? () => {} : () => setOpenNewModal(true)}
      disabled={disabled}
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

export default CreateSessionButton;

import { useState } from "react";
import { Header, Segment } from "semantic-ui-react";

import CenterMiddle from "../../components/blocks/CenterMiddle";
import TimeModal from "../../components/time-modal/TimeModal";
import { SessionType } from "../../types/session";
import { getTimeValues } from "./utils";

type SessionHeadingPropsType = {
  session: SessionType;
  currentTimeInSeconds: number;
  userIsAdmin: boolean;
};

const SessionHeading = ({
  session,
  currentTimeInSeconds,
  userIsAdmin,
}: SessionHeadingPropsType) => {
  const [openTimeModal, setOpenTimeModal] = useState(false);
  const timeValues = getTimeValues({ session, currentTimeInSeconds });

  return (
    <CenterMiddle textAlign="center">
      <Header as="h1" inverted>
        <Header.Subheader style={{ margin: "7px" }}>Session</Header.Subheader>
        {session.name}
        <Header.Subheader>
          {`${session.participant_count} participants`}
          <br />
          {`${session.total_rounds} rounds`}
        </Header.Subheader>
      </Header>
      <Segment
        inverted
        compact
        onClick={() => setOpenTimeModal(true)}
        {...(userIsAdmin
          ? { color: timeValues.color, cursor: "pointer" }
          : {
              style: {
                backgroundColor: "#27292a",
                color: "rgba(255, 255, 255, 0.9)",
              },
            })}
      >
        {`${timeValues.remainingMinutes}:${timeValues.remainingSeconds}`}
      </Segment>
      <TimeModal
        session={session}
        openTimeModal={openTimeModal}
        setOpenTimeModal={setOpenTimeModal}
      />
    </CenterMiddle>
  );
};

export default SessionHeading;

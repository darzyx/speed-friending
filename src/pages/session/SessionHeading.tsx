import { useState } from "react";
import { Header, Segment } from "semantic-ui-react";

import CenterMiddle from "../../components/blocks/CenterMiddle";
import TimeModal from "../../components/time-modal/TimeModal";
import { SessionType } from "../../types/session";
import { getTimeValues } from "./utils";

type SessionHeadingPropsType = {
  session: SessionType;
  currentTimeInSeconds: number;
};

const SessionHeading = ({
  session,
  currentTimeInSeconds,
}: SessionHeadingPropsType) => {
  const [openTimeModal, setOpenTimeModal] = useState(false);
  const timeValues = getTimeValues({ session, currentTimeInSeconds });

  return (
    <CenterMiddle textAlign="center">
      <Header as="h1" inverted>
        <Header.Subheader>Session</Header.Subheader>
        {session.name}
        <Header.Subheader>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{`${session.participant_count} participants`}</span>
            <span>{`${session.total_rounds} rounds`}</span>
          </div>
        </Header.Subheader>
      </Header>

      <Segment
        color={timeValues.color}
        inverted
        compact
        onClick={() => setOpenTimeModal(true)}
        style={{ cursor: "pointer" }}
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

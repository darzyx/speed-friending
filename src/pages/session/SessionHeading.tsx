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
      <Header as="h1" inverted>
        {session.name}
        <Header.Subheader>
          {`participants: ${session.participant_count}`}
          <br />
          {`total rounds: ${session.total_rounds}`}
          <br />
          {`active round: ${session.active_round}`}
        </Header.Subheader>
      </Header>
    </CenterMiddle>
  );
};

export default SessionHeading;

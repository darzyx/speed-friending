import { useState } from "react";
import { Segment } from "semantic-ui-react";

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
      <h1 style={{ marginBottom: "0" }}>{session.name}</h1>
      <h4 style={{ marginTop: "0", marginBottom: "0", color: "#a9a9a9" }}>
        {`participants: ${session.participant_count}`}
      </h4>
      <h4 style={{ marginTop: "0", marginBottom: "0", color: "#a9a9a9" }}>
        {`total rounds: ${session.total_rounds}`}
      </h4>
      <h4 style={{ marginTop: "0", color: "#a9a9a9" }}>
        {`active round: ${session.active_round}`}
      </h4>
    </CenterMiddle>
  );
};

export default SessionHeading;

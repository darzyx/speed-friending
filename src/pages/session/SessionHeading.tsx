import { useState } from "react";
import { Breadcrumb, Header, Segment } from "semantic-ui-react";

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
        <Header.Subheader>Session</Header.Subheader>
        {session.name}
      </Header>
      <Breadcrumb>
        <Breadcrumb.Section>
          {`${session.participant_count} participants`}
        </Breadcrumb.Section>
        <Breadcrumb.Divider style={{ color: "white" }} />
        <Breadcrumb.Section>
          {`${session.total_rounds} rounds`}
        </Breadcrumb.Section>
        <Breadcrumb.Divider style={{ color: "white" }} />
        <Breadcrumb.Section>
          {`active round: ${session.active_round}`}
        </Breadcrumb.Section>
      </Breadcrumb>
    </CenterMiddle>
  );
};

export default SessionHeading;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Dimmer,
  Divider,
  Header,
  Icon,
  Loader,
  Statistic,
} from "semantic-ui-react";

import { getGame, getTimeValues } from "./utils";
import { SessionWithIdType } from "../../types/session";
import { initSession } from "../../App";
import CenterMiddle from "../../components/blocks/CenterMiddle";
import TimeModal from "../../components/time-modal/TimeModal";
import NavButton from "../../components/blocks/NavButton";
import PastRoundsModal from "./PastRoundsModal";
import Participants from "./Participants";
import { ColorfulHeader } from "../../components/blocks/ColorfulText";

type SessionPropsType = {
  sessions: SessionWithIdType[];
  isGettingSessions: boolean;
  currentTimeInSeconds: number;
  userIsAdmin: boolean;
};
const Session = ({
  sessions,
  isGettingSessions,
  currentTimeInSeconds,
  userIsAdmin,
}: SessionPropsType) => {
  const { id } = useParams();

  const [session, setSession] = useState(initSession);
  const hasSession = session?.name?.length > 0;
  useEffect(() => {
    const foundSession = sessions.find((s) => s.id === id);
    if (foundSession) {
      setSession(foundSession);
    }
  }, [id, sessions]);

  const [openTimeModal, setOpenTimeModal] = useState(false);
  const timeValues = getTimeValues({ session, currentTimeInSeconds });

  const [openPastRoundsModal, setOpenPastRoundsModal] = useState(false);

  if (isGettingSessions || !hasSession) {
    return (
      <Dimmer active>
        <Loader size="big">Loading...</Loader>
      </Dimmer>
    );
  }

  const game = getGame(session.participant_count, session.total_rounds);
  const activeRound = Object.values(game)[Number(session.active_round) - 1];

  return (
    <div>
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
        <Statistic
          inverted
          {...(userIsAdmin && {
            color: timeValues.color,
            onClick: () => setOpenTimeModal(true),
            style: { cursor: "pointer" },
          })}
        >
          <Statistic.Value>
            {`${timeValues.remainingMinutes}:${timeValues.remainingSeconds}`}
          </Statistic.Value>
          <Statistic.Label>{`Round ${session.active_round}`}</Statistic.Label>
        </Statistic>
        <TimeModal
          session={session}
          openTimeModal={openTimeModal}
          setOpenTimeModal={setOpenTimeModal}
        />
      </CenterMiddle>
      <Divider hidden />
      <Participants round={activeRound} />
      <Divider hidden />
      <CenterMiddle>
        <NavButton onClick={() => setOpenPastRoundsModal(true)}>
          <Icon name="history" /> View Past Rounds
        </NavButton>
        <PastRoundsModal
          game={game}
          activeRound={session.active_round}
          openPastRoundsModal={openPastRoundsModal}
          setOpenPastRoundsModal={setOpenPastRoundsModal}
        />
      </CenterMiddle>
    </div>
  );
};

export default Session;

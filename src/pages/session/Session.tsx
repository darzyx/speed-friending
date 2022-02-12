import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Dimmer, Divider, Header, Loader, Statistic } from "semantic-ui-react";

import Participant from "./Participant";
import { getGame, getTimeValues, RoundType } from "./utils";
import { SessionWithIdType } from "../../types/session";
import { initSession } from "../../App";
import styled from "styled-components";
import CenterMiddle from "../../components/blocks/CenterMiddle";
import TimeModal from "../../components/time-modal/TimeModal";

const ParticipantsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  grid-gap: 8px;
`;
const Participants = ({ activeRound }: { activeRound: RoundType }) => (
  <ParticipantsContainer>
    {activeRound.top.map((nTop, idxTop) => (
      <div>
        <Participant key={nTop} n={nTop} top={true} />
        <Participant
          key={activeRound.btm[idxTop]}
          n={activeRound.btm[idxTop]}
          top={false}
        />
      </div>
    ))}
  </ParticipantsContainer>
);

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

  const [
    activePage,
    // setSelectedPage
  ] = useState("1");

  const [openTimeModal, setOpenTimeModal] = useState(false);
  const timeValues = getTimeValues({ session, currentTimeInSeconds });

  if (isGettingSessions || !hasSession) {
    return (
      <Dimmer active>
        <Loader size="big">Loading...</Loader>
      </Dimmer>
    );
  }

  const game = getGame(session.participant_count, session.total_rounds);
  const activeRound = Object.values(game)[Number(activePage) - 1];

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
          <Statistic.Label>{`Round ${activePage}`}</Statistic.Label>
        </Statistic>
        <TimeModal
          session={session}
          openTimeModal={openTimeModal}
          setOpenTimeModal={setOpenTimeModal}
        />
      </CenterMiddle>
      <Divider hidden />
      <Participants activeRound={activeRound} />
    </div>
  );
};

export default Session;

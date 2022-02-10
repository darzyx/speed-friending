import { DocumentData } from "firebase/firestore";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button, Icon, Label, Loader, SemanticCOLORS } from "semantic-ui-react";
import { centerMiddleCSS } from "../components/blocks/CenterMiddle";

const maxSessions = 50;

const HomeContainer = styled.div`
  ${centerMiddleCSS}
  margin: 0;
  padding: 0;
`;

type TimeLabelPropsType = {
  session: DocumentData;
  currentTimeInSeconds: number;
};
const TimeLabel = ({ session, currentTimeInSeconds }: TimeLabelPropsType) => {
  let color: SemanticCOLORS = "green";
  let remainingTime = session.end_time - currentTimeInSeconds;
  if (remainingTime <= 0) {
    color = "red";
    remainingTime = 0;
  } else if (remainingTime <= 60) {
    color = "yellow";
  }
  return <Label color={color}>{remainingTime}</Label>;
};

type HomePropsType = {
  isGettingSessions: boolean;
  hasAnySessions: boolean;
  sessions: DocumentData[];
  setOpenNewModal: (arg: boolean) => void;
  currentTimeInSeconds: number;
};
const Home = ({
  isGettingSessions,
  hasAnySessions,
  sessions,
  setOpenNewModal,
  currentTimeInSeconds,
}: HomePropsType) => {
  const disableNewSession = isGettingSessions || sessions.length >= maxSessions;
  return (
    <HomeContainer>
      <h1>✨ Speed Friending 🏕️</h1>
      <h3>Ongoing Sessions</h3>
      {hasAnySessions &&
        sessions.map((session, index) => (
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
            <TimeLabel
              session={session}
              currentTimeInSeconds={currentTimeInSeconds}
            />
          </Button>
        ))}
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
        {isGettingSessions ? (
          <Loader active inline="centered" size="tiny" />
        ) : (
          <>
            {sessions.length >= maxSessions ? (
              <Icon name="close" />
            ) : (
              <Icon name="plus" />
            )}
          </>
        )}
      </Button>
    </HomeContainer>
  );
};

export default Home;

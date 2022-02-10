import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Dimmer,
  Divider,
  Icon,
  Loader,
  Pagination,
  Segment,
} from "semantic-ui-react";
import styled from "styled-components";

import ParticipantPosition from "./ParticipantPosition";
import { getGame, getTimeValues } from "./utils";
import { SessionWithIdType } from "../../types/session";
import { initSession } from "../../App";
import CenterMiddle from "../../components/blocks/CenterMiddle";

const StyledPagination = styled(Pagination)`
  &&&& {
    max-width: 100%;
    &,
    * {
      color: white !important;
      background-color: #1b1c1d;
      outline: none;
      border: none;
    }
    .active.item,
    &:hover {
      background-color: #27292a;
    }
  }
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  margin-top: 20px;
  padding: 0;
  color: #00aaff;
  cursor: pointer;
  font-size: 16px;
  outline: none;
`;

const ParticipantPositionRow = ({
  row,
  selectedRoundIsActive,
  top,
}: {
  row: number[];
  selectedRoundIsActive: boolean;
  top: boolean;
}) => (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    {row.map((n, rowIndex) => (
      <ParticipantPosition
        key={rowIndex}
        n={n}
        selectedRoundIsActive={selectedRoundIsActive}
        top={top}
      />
    ))}
  </div>
);

type SessionPropsType = {
  sessions: SessionWithIdType[];
  isGettingSessions: boolean;
  currentTimeInSeconds: number;
};
const Session = ({
  sessions,
  isGettingSessions,
  currentTimeInSeconds,
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

  const [selectedPage, setSelectedPage] = useState("1");
  const handlePageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { activePage }: { activePage: string }
  ) => {
    setSelectedPage(activePage);
  };

  if (isGettingSessions || !hasSession) {
    return (
      <Dimmer active>
        <Loader size="big">Loading...</Loader>
      </Dimmer>
    );
  }

  const game = getGame(session.participant_count, session.total_rounds);
  const selectedRound = Object.values(game)[Number(selectedPage) - 1];
  const selectedRoundIsActive = session?.active_round === Number(selectedPage);

  const timeValues = getTimeValues({ session, currentTimeInSeconds });

  return (
    <div>
      <CenterMiddle textAlign="center">
        <h1 style={{ marginBottom: "0" }}>{session.name}</h1>
        <Segment color={timeValues.color} inverted compact>
          {`${timeValues.remainingMinutes}:${timeValues.remainingSeconds}`}
        </Segment>
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
      <div style={{ margin: "20px" }}>
        <CenterMiddle textAlign="center">
          <h3 style={{ marginBottom: "5px" }}>
            {`Round ${selectedPage} (${
              selectedRoundIsActive ? "active" : "inactive"
            })`}
          </h3>
        </CenterMiddle>
        <ParticipantPositionRow
          row={selectedRound.top.slice(0, selectedRound.top.length / 2)}
          selectedRoundIsActive={selectedRoundIsActive}
          top={true}
        />
        <ParticipantPositionRow
          row={selectedRound.btm.slice(0, selectedRound.top.length / 2)}
          selectedRoundIsActive={selectedRoundIsActive}
          top={false}
        />
        <Divider hidden />
        <ParticipantPositionRow
          row={selectedRound.top.slice(
            selectedRound.top.length / 2,
            selectedRound.top.length
          )}
          selectedRoundIsActive={selectedRoundIsActive}
          top={true}
        />
        <ParticipantPositionRow
          row={selectedRound.btm.slice(
            selectedRound.btm.length / 2,
            selectedRound.btm.length
          )}
          selectedRoundIsActive={selectedRoundIsActive}
          top={false}
        />
        <Divider hidden />
      </div>
      <CenterMiddle>
        <StyledPagination
          activePage={selectedPage}
          onPageChange={handlePageChange}
          totalPages={session.total_rounds}
          boundaryRange={0}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
        />
        <LinkButton
          onClick={() => setSelectedPage(session.active_round.toString())}
        >
          Go to Active Round{" "}
          <Icon
            name={
              selectedRoundIsActive
                ? "check circle outline"
                : "arrow alternate circle right outline"
            }
          />
        </LinkButton>
      </CenterMiddle>
    </div>
  );
};

export default Session;

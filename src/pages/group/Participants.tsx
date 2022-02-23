import { Segment } from "semantic-ui-react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { GroupWithIdType } from "../../types/group";

import Participant from "./participant/Participant";
import { RoundType } from "./utils";

const ParticipantsContainer = styled.div`
  margin: auto;
  max-width: 100%;
`;

const ParticipantsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(55px, 1fr));
  grid-gap: 8px;
`;
const Participants = ({
  round,
  roundNumber,
  onToggleDropoutStatus,
  group,
}: {
  round: RoundType;
  roundNumber: number;
  onToggleDropoutStatus?: (n: number) => void;
  group: GroupWithIdType;
}) => (
  <Segment
    inverted
    style={{
      backgroundColor: theme.color.one,
      margin: "0",
    }}
  >
    <ParticipantsContainer>
      <ParticipantsGrid>
        {round.top.map((nTop, idxTop) => (
          <div key={idxTop}>
            <Participant
              nParticipant={nTop}
              top={true}
              nPartner={round.btm[idxTop]}
              onToggleDropoutStatus={onToggleDropoutStatus}
              group={group}
              roundNumber={roundNumber}
            />
            <Participant
              nParticipant={round.btm[idxTop]}
              top={false}
              nPartner={nTop}
              onToggleDropoutStatus={onToggleDropoutStatus}
              group={group}
              roundNumber={roundNumber}
            />
          </div>
        ))}
      </ParticipantsGrid>
    </ParticipantsContainer>
  </Segment>
);

export default Participants;

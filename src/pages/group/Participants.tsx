import Participant from "./Participant";
import styled from "styled-components";

import { RoundType } from "./utils";

const ParticipantsContainer = styled.div`
  margin: auto;
  max-width: 100%;
`;

const ParticipantsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  grid-gap: 8px;
`;
const Participants = ({
  round,
  onClickParticipant,
  dropouts,
}: {
  round: RoundType;
  onClickParticipant?: (n: number) => void;
  dropouts: number[];
}) => (
  <ParticipantsContainer>
    <ParticipantsGrid>
      {round.top.map((nTop, idxTop) => (
        <div key={idxTop}>
          <Participant
            n={nTop}
            top={true}
            onClickParticipant={onClickParticipant}
            dropouts={dropouts}
          />
          <Participant
            n={round.btm[idxTop]}
            top={false}
            onClickParticipant={onClickParticipant}
            dropouts={dropouts}
          />
        </div>
      ))}
    </ParticipantsGrid>
  </ParticipantsContainer>
);

export default Participants;

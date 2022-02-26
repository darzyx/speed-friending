import { memo } from "react";
import { Segment } from "semantic-ui-react";
import styled from "styled-components";

import { dropoutsType } from "../../types/group";
import Participant from "./participant/Participant";
import { RoundType } from "./utils";

const ParticipantsContainer = styled(Segment).attrs((props) => ({
  inverted: props.inverted,
}))`
  &&&& {
    background-color: ${({ theme }) => theme.color.one};
    margin: 0;
  }
`;

const ParticipantsInnerContainer = styled.div`
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
  dropouts,
  inverted,
}: {
  round: RoundType;
  roundNumber: number;
  onToggleDropoutStatus?: (n: number) => void;
  dropouts: dropoutsType;
  inverted: boolean;
}) => (
  <ParticipantsContainer>
    <ParticipantsInnerContainer>
      <ParticipantsGrid>
        {round.top.map((nTop, idxTop) => (
          <div key={idxTop}>
            <Participant
              nParticipant={nTop}
              top={true}
              nPartner={round.btm[idxTop]}
              onToggleDropoutStatus={onToggleDropoutStatus}
              dropouts={dropouts}
              roundNumber={roundNumber}
              inverted={inverted}
            />
            <Participant
              nParticipant={round.btm[idxTop]}
              top={false}
              nPartner={nTop}
              onToggleDropoutStatus={onToggleDropoutStatus}
              dropouts={dropouts}
              roundNumber={roundNumber}
              inverted={inverted}
            />
          </div>
        ))}
      </ParticipantsGrid>
    </ParticipantsInnerContainer>
  </ParticipantsContainer>
);

export default memo(Participants);

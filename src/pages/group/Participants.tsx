import { Segment } from "semantic-ui-react";
import styled from "styled-components";
import theme from "../../styles/theme";

import Participant from "./Participant";
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
  dropouts,
  onToggleDropoutStatus,
}: {
  round: RoundType;
  dropouts: number[];
  onToggleDropoutStatus?: (n: number) => void;
}) => (
  <Segment inverted style={{ backgroundColor: theme.color.one }}>
    <ParticipantsContainer>
      <ParticipantsGrid>
        {round.top.map((nTop, idxTop) => (
          <div key={idxTop}>
            <Participant
              n={nTop}
              top={true}
              dropouts={dropouts}
              onToggleDropoutStatus={onToggleDropoutStatus}
            />
            <Participant
              n={round.btm[idxTop]}
              top={false}
              dropouts={dropouts}
              onToggleDropoutStatus={onToggleDropoutStatus}
            />
          </div>
        ))}
      </ParticipantsGrid>
    </ParticipantsContainer>
  </Segment>
);

export default Participants;

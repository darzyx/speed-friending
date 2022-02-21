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
  grid-template-columns: repeat(auto-fit, minmax(45px, 1fr));
  grid-gap: 8px;
`;
const Participants = ({
  round,
  dropouts,
  currentTimeInSeconds,
  onToggleDropoutStatus,
  modalView,
}: {
  round: RoundType;
  dropouts: number[];
  currentTimeInSeconds: number;
  onToggleDropoutStatus?: (n: number) => void;
  modalView?: boolean;
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
              partner={round.btm[idxTop]}
              currentTimeInSeconds={currentTimeInSeconds}
              onToggleDropoutStatus={onToggleDropoutStatus}
              modalView={modalView}
            />
            <Participant
              n={round.btm[idxTop]}
              top={false}
              dropouts={dropouts}
              partner={nTop}
              currentTimeInSeconds={currentTimeInSeconds}
              onToggleDropoutStatus={onToggleDropoutStatus}
              modalView={modalView}
            />
          </div>
        ))}
      </ParticipantsGrid>
    </ParticipantsContainer>
  </Segment>
);

export default Participants;

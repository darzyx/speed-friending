import Participant from "./Participant";
import styled from "styled-components";

import { RoundType } from "./utils";

const ParticipantsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  grid-gap: 8px;
`;
const Participants = ({ round }: { round: RoundType }) => (
  <ParticipantsContainer>
    {round.top.map((nTop, idxTop) => (
      <div key={idxTop}>
        <Participant n={nTop} top={true} />
        <Participant n={round.btm[idxTop]} top={false} />
      </div>
    ))}
  </ParticipantsContainer>
);

export default Participants;

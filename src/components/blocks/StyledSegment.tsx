import { Segment } from "semantic-ui-react";
import styled from "styled-components";

const StyledSegment = styled(Segment).attrs((props) => ({
  inverted: props.inverted,
}))`
  &&&& {
    width: 100%;
    max-width: 500px;
    color: ${({ theme }) => theme.color.text};
    background-color: ${({ theme }) => theme.color.three};
    border-color: ${({ theme }) => theme.color.four};
  }
`;

export default StyledSegment;

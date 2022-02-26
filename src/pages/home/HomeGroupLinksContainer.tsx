import styled from "styled-components";
import { Segment } from "semantic-ui-react";

const HomeGroupLinksContainer = styled(Segment).attrs((props) => ({
  inverted: props.inverted,
}))`
  &&&& {
    border: none;
    box-shadow: none;
    background-color: ${({ theme }) => theme.color.two};
    width: 100%;
  }
`;

export default HomeGroupLinksContainer;

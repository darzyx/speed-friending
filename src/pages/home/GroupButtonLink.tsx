import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import styled from "styled-components";

const GroupButtonLink = styled(Button).attrs((props) => ({
  to: props.to,
  as: Link,
}))`
  &&&& {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    padding: 15px 5px 15px 20px;
    background-color: ${({ theme }) => theme.color.four};
    color: ${({ theme }) => theme.color.text};
  }
`;

export default GroupButtonLink;

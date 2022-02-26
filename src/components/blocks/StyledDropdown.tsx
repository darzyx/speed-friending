import { Dropdown } from "semantic-ui-react";
import styled from "styled-components";

const StyledDropdown = styled(Dropdown)`
  &&&& {
    width: 100%;
    margin-bottom: 10px;
    padding-right: 1em !important;
    &,
    *,
    div {
      background-color: ${({ theme }) => theme.color.two} !important;
      color: ${({ theme }) => theme.color.text} !important;
      border-color: ${({ theme }) => theme.color.border} !important;
      text-align: center !important;
    }
    i {
      max-height: 35px;
      margin: 0;
      padding: 0;
    }
  }
`;

export default StyledDropdown;

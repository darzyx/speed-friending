import { Form } from "semantic-ui-react";
import styled from "styled-components";

const StyledFormInput = styled(Form.Input)`
  &&&& {
    margin-bottom: 10px;
    input {
      background-color: ${({ theme }) => theme.color.two} !important;
      color: ${({ theme }) => theme.color.text};
      border-color: ${({ theme }) => theme.color.muted_text} !important;
      &::placeholder {
        color: ${({ theme }) => theme.color.muted_text} !important;
      }
    }
  }
`;

export default StyledFormInput;

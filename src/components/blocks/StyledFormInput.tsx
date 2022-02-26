import { Form } from "semantic-ui-react";
import styled from "styled-components";

const StyledFormInput = styled(Form.Input)`
  &&&& {
    margin-bottom: 10px;
    input {
      background-color: ${({ theme }) => theme.color.two} !important;
      color: ${({ theme }) => theme.color.text};
      border-color: ${({ theme }) => theme.color.border} !important;
      &::placeholder {
        color: ${({ theme }) => theme.color.text_muted} !important;
      }
    }
  }
`;

export default StyledFormInput;

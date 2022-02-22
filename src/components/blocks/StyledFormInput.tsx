import { Form } from "semantic-ui-react";
import styled from "styled-components";

const StyledFormInput = styled(Form.Input)`
  &&&& {
    margin-bottom: 10px;
    input {
      background-color: ${({ theme }) => theme.color.two};
      color: ${({ theme }) => theme.color.text};
      border-color: ${({ theme }) => theme.color.four};

      &::placeholder {
        color: ${({ theme }) => theme.color.five};
      }
    }
  }
`;

export default StyledFormInput;

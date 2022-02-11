import {
  Modal as SemanticModal,
  Header as SemanticHeader,
} from "semantic-ui-react";
import styled from "styled-components";

import modalColors from "../../styles/modalColors";

// MODAL
const CustomModal = styled(SemanticModal)`
  &&&& {
    i.close.icon {
      color: white;
    }
    ${modalColors};
  }
`;
const Content = styled(SemanticModal.Content)`
  &&&& {
    ${modalColors}
  }
`;
CustomModal.Content = Content;

// HEADER (CAN BE USED IN MODAL)
const CustomHeader = styled(SemanticHeader)`
  &&&& {
    ${modalColors}
    text-align: center;
    padding: 0.75rem 1rem !important; // Overrides another "important!"
  }
`;
const Subheader = styled(SemanticHeader.Subheader)`
  &&&& {
    ${modalColors}
    color:rgba(255, 255, 255, 0.8);
  }
`;
CustomHeader.Subheader = Subheader;

export { CustomModal, CustomHeader };

import { Location } from "react-router-dom";
import { Divider } from "semantic-ui-react";

import NewForm from "./NewForm";
import modalColors from "../../styles/modalColors";
import {
  CustomModal,
  CustomHeader,
} from "../../components/blocks/StyledSemanticComponents";

type NewModalPropsType = {
  location: Location;
  openNewModal: boolean;
  setOpenNewModal: (openNewModal: boolean) => void;
};
const NewModal = ({
  location,
  openNewModal,
  setOpenNewModal,
}: NewModalPropsType) => (
  <CustomModal
    onClose={() => setOpenNewModal(false)}
    onOpen={() => setOpenNewModal(true)}
    open={openNewModal}
    style={modalColors}
    closeIcon
  >
    <CustomHeader>Create New Session</CustomHeader>
    <CustomModal.Content style={modalColors}>
      <NewForm setOpenNewModal={setOpenNewModal} />
      <Divider clearing hidden fitted />
    </CustomModal.Content>
  </CustomModal>
);

export default NewModal;

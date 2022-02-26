import { Divider } from "semantic-ui-react";

import StyledModal from "../../components/blocks/StyledModal";
import CreateGroupForm from "./CreateGroupForm";

type CreateGroupModalPropsType = {
  openCreateGroupModal: boolean;
  setOpenCreateGroupModal: (openCreateGroupModal: boolean) => void;
  darkMode: boolean;
};
const CreateGroupModal = ({
  openCreateGroupModal,
  setOpenCreateGroupModal,
  darkMode,
}: CreateGroupModalPropsType) => (
  <StyledModal
    header="New Group"
    subheader="Create"
    content={
      <div>
        <CreateGroupForm
          setOpenCreateGroupModal={setOpenCreateGroupModal}
          darkMode={darkMode}
        />
        <Divider clearing hidden fitted />
      </div>
    }
    openModal={openCreateGroupModal}
    setOpenModal={setOpenCreateGroupModal}
    darkMode={darkMode}
    size="small"
  />
);

export default CreateGroupModal;

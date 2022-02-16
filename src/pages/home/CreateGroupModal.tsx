import { Divider } from "semantic-ui-react";

import StyledModal from "../../components/blocks/StyledModal";
import CreateGroupForm from "./CreateGroupForm";

type CreateGroupModalPropsType = {
  openCreateGroupModal: boolean;
  setOpenCreateGroupModal: (openCreateGroupModal: boolean) => void;
};
const CreateGroupModal = ({
  openCreateGroupModal,
  setOpenCreateGroupModal,
}: CreateGroupModalPropsType) => (
  <StyledModal
    header="New Group Group"
    subheader="Create"
    content={
      <div>
        <CreateGroupForm setOpenCreateGroupModal={setOpenCreateGroupModal} />
        <Divider clearing hidden fitted />
      </div>
    }
    openModal={openCreateGroupModal}
    setOpenModal={setOpenCreateGroupModal}
  />
);

export default CreateGroupModal;

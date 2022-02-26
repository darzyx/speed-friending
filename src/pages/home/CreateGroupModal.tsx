import { Divider } from "semantic-ui-react";

import StyledModal from "../../components/blocks/StyledModal";
import CreateGroupForm from "./CreateGroupForm";

type CreateGroupModalPropsType = {
  openCreateGroupModal: boolean;
  setOpenCreateGroupModal: (openCreateGroupModal: boolean) => void;
  inverted: boolean;
};
const CreateGroupModal = ({
  openCreateGroupModal,
  setOpenCreateGroupModal,
  inverted,
}: CreateGroupModalPropsType) => (
  <StyledModal
    header="New Group"
    subheader="Create"
    content={
      <div>
        <CreateGroupForm
          setOpenCreateGroupModal={setOpenCreateGroupModal}
          inverted={inverted}
        />
        <Divider clearing hidden fitted />
      </div>
    }
    openModal={openCreateGroupModal}
    setOpenModal={setOpenCreateGroupModal}
    inverted={inverted}
    size="small"
  />
);

export default CreateGroupModal;

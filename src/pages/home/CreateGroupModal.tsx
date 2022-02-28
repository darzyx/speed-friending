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
      <CreateGroupForm
        setOpenCreateGroupModal={setOpenCreateGroupModal}
        inverted={inverted}
      />
    }
    openModal={openCreateGroupModal}
    setOpenModal={setOpenCreateGroupModal}
    inverted={inverted}
    size="tiny"
  />
);

export default CreateGroupModal;

import StyledModal from "../../../components/blocks/StyledModal";
import CreatePrivateGroupForm from "./CreatePrivateGroupForm";

type CreatePrivateGroupModalPropsType = {
  openCreatePrivateGroupModal: boolean;
  setOpenCreatePrivateGroupModal: (
    openCreatePrivateGroupModal: boolean
  ) => void;
  inverted: boolean;
};
const CreatePrivateGroupModal = ({
  openCreatePrivateGroupModal,
  setOpenCreatePrivateGroupModal,
  inverted,
}: CreatePrivateGroupModalPropsType) => (
  <StyledModal
    header="New Private Group"
    subheader="Create"
    content={
      <CreatePrivateGroupForm
        setOpenCreatePrivateGroupModal={setOpenCreatePrivateGroupModal}
        inverted={inverted}
      />
    }
    openModal={openCreatePrivateGroupModal}
    setOpenModal={setOpenCreatePrivateGroupModal}
    inverted={inverted}
    size="small"
  />
);

export default CreatePrivateGroupModal;

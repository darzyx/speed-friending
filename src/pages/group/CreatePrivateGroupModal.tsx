import StyledModal from "../../components/blocks/StyledModal";

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
    header="New Group"
    subheader="Create"
    content={<div>Hello, world</div>}
    openModal={openCreatePrivateGroupModal}
    setOpenModal={setOpenCreatePrivateGroupModal}
    inverted={inverted}
    size="small"
  />
);

export default CreatePrivateGroupModal;

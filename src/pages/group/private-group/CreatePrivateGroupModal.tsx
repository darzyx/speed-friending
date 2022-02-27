import StyledModal from "../../../components/blocks/StyledModal";
import { groupWithIdType } from "../../../types/group";
import CreatePrivateGroupForm from "./CreatePrivateGroupForm";

type CreatePrivateGroupModalPropsType = {
  group: groupWithIdType;
  openCreatePrivateGroupModal: boolean;
  setOpenCreatePrivateGroupModal: (
    openCreatePrivateGroupModal: boolean
  ) => void;
  inverted: boolean;
};
const CreatePrivateGroupModal = ({
  group,
  openCreatePrivateGroupModal,
  setOpenCreatePrivateGroupModal,
  inverted,
}: CreatePrivateGroupModalPropsType) => (
  <StyledModal
    header="New Private Group"
    subheader="Create"
    content={
      <CreatePrivateGroupForm
        group={group}
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

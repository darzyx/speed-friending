import { GroupWithIdType } from "../../types/group";
import StyledModal from "../blocks/StyledModal";

type DropoutModalPropsType = {
  group: GroupWithIdType;
  openDropoutModal: boolean;
  setOpenDropoutModal: (openDropoutModal: boolean) => void;
};
const DropoutModal = ({
  group,
  openDropoutModal,
  setOpenDropoutModal,
}: DropoutModalPropsType) => {
  return (
    <StyledModal
      header={group.name}
      subheader="Dropout"
      content={<div>Content goes here</div>}
      actions={<div>Actions go here</div>}
      setOpenModal={setOpenDropoutModal}
      openModal={openDropoutModal}
      size="tiny"
    />
  );
};

export default DropoutModal;

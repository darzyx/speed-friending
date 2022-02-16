import { Divider } from "semantic-ui-react";

import StyledModal from "../../components/blocks/StyledModal";
import CreateSessionForm from "./CreateSessionForm";

type CreateSessionModalPropsType = {
  openCreateSessionModal: boolean;
  setOpenCreateSessionModal: (openCreateSessionModal: boolean) => void;
};
const CreateSessionModal = ({
  openCreateSessionModal,
  setOpenCreateSessionModal,
}: CreateSessionModalPropsType) => (
  <StyledModal
    header="New Group Session"
    subheader="Create"
    content={
      <div>
        <CreateSessionForm
          setOpenCreateSessionModal={setOpenCreateSessionModal}
        />
        <Divider clearing hidden fitted />
      </div>
    }
    openModal={openCreateSessionModal}
    setOpenModal={setOpenCreateSessionModal}
  />
);

export default CreateSessionModal;

import { Location } from "react-router-dom";
import { Divider } from "semantic-ui-react";

import StyledModal from "../../components/blocks/StyledModal";
import NewForm from "./NewForm";

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
  <StyledModal
    header="New Group Session"
    subheader="Create"
    content={
      <div>
        <NewForm setOpenNewModal={setOpenNewModal} />
        <Divider clearing hidden fitted />
      </div>
    }
    openModal={openNewModal}
    setOpenModal={setOpenNewModal}
  />
);

export default NewModal;

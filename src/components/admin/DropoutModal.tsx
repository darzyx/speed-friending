import { Button, Divider } from "semantic-ui-react";
import Participants from "../../pages/group/Participants";
import { RoundType } from "../../pages/group/utils";
import { GroupWithIdType } from "../../types/group";
import CenterMiddle from "../blocks/CenterMiddle";
import StyledModal from "../blocks/StyledModal";

type DropoutModalPropsType = {
  group: GroupWithIdType;
  openDropoutModal: boolean;
  setOpenDropoutModal: (openDropoutModal: boolean) => void;
  activeRound: RoundType;
};
const DropoutModal = ({
  group,
  openDropoutModal,
  setOpenDropoutModal,
  activeRound,
}: DropoutModalPropsType) => {
  return (
    <StyledModal
      header={group.name}
      subheader="Dropout"
      content={
        <div>
          <p style={{ textAlign: "center" }}>Click on the dropout(s)</p>
          <Participants round={activeRound} />
        </div>
      }
      actions={
        <CenterMiddle>
          <Button onClick={() => setOpenDropoutModal(false)}>Close</Button>
          <Divider hidden clearing />
        </CenterMiddle>
      }
      setOpenModal={setOpenDropoutModal}
      openModal={openDropoutModal}
    />
  );
};

export default DropoutModal;

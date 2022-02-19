import { Button } from "semantic-ui-react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase";
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
  const handleClickParticipant = (n: number) => {
    const docRef = doc(db, "groups", group.id);
    const payload = {
      ...group,
      dropouts: group.dropouts.includes(n)
        ? group.dropouts.filter((dropout) => dropout !== n)
        : Array.from(new Set(group.dropouts.concat([n]))),
    };

    updateDoc(docRef, payload);

    console.log({ n });
  };

  return (
    <StyledModal
      header={group.name}
      subheader="Dropout"
      content={
        <div>
          <p style={{ textAlign: "center" }}>Click on the dropout(s)</p>
          <Participants
            round={activeRound}
            onClickParticipant={handleClickParticipant}
            dropouts={group.dropouts}
          />
        </div>
      }
      actions={
        <CenterMiddle>
          <Button onClick={() => setOpenDropoutModal(false)}>Close</Button>
        </CenterMiddle>
      }
      setOpenModal={setOpenDropoutModal}
      openModal={openDropoutModal}
    />
  );
};

export default DropoutModal;

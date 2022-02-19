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
  currentTimeInSeconds: number;
  activeRound: RoundType;
};
const DropoutModal = ({
  group,
  openDropoutModal,
  setOpenDropoutModal,
  currentTimeInSeconds,
  activeRound,
}: DropoutModalPropsType) => {
  const handleClickParticipant = (n: number) => {
    if (n !== 0) {
      const docRef = doc(db, "groups", group.id);
      const payload = {
        ...group,
        dropouts: group.dropouts.includes(n)
          ? group.dropouts.filter((dropout) => dropout !== n)
          : Array.from(new Set(group.dropouts.concat([n]))),
      };

      updateDoc(docRef, payload);
    }
  };

  return (
    <StyledModal
      header={group.name}
      subheader="Dropout"
      content={
        <div>
          <p style={{ textAlign: "center" }}>
            Click on a participant to toggle dropout status
          </p>
          <Participants
            round={activeRound}
            onClickParticipant={handleClickParticipant}
            currentTimeInSeconds={currentTimeInSeconds}
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

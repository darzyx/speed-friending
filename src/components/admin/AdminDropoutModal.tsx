import { Button, Grid } from "semantic-ui-react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase";
import Participants from "../../pages/group/Participants";
import { RoundType } from "../../pages/group/utils";
import { GroupWithIdType } from "../../types/group";
import StyledModal from "../blocks/StyledModal";

type AdminDropoutModalPropsType = {
  group: GroupWithIdType;
  openDropoutModal: boolean;
  setOpenDropoutModal: (openDropoutModal: boolean) => void;
  activeRound: RoundType;
};
const AdminDropoutModal = ({
  group,
  openDropoutModal,
  setOpenDropoutModal,
  activeRound,
}: AdminDropoutModalPropsType) => {
  const handleToggleDropoutStatus = (n: number) => {
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
            onToggleDropoutStatus={handleToggleDropoutStatus}
            dropouts={group.dropouts}
          />
        </div>
      }
      actions={
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column textAlign="center">
              <Button onClick={() => setOpenDropoutModal(false)}>Close</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      }
      setOpenModal={setOpenDropoutModal}
      openModal={openDropoutModal}
    />
  );
};

export default AdminDropoutModal;

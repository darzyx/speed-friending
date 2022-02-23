import { Button, Grid } from "semantic-ui-react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase";
import Participants from "../../pages/group/Participants";
import { getIsRoundDropout, RoundType } from "../../pages/group/utils";
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
  const { id, dropouts, round_active, name } = group;
  const handleToggleDropoutStatus = (n: number) => {
    console.log("TOGGLER FUNCTION");

    if (n !== 0) {
      const docRef = doc(db, "groups", id);
      const payload = {
        ...group,
        dropouts: getIsRoundDropout({
          nParticipant: n,
          roundNumber: group.round_active,
          group,
        })
          ? dropouts.filter((d) => d.participant_number !== n)
          : Array.from(
              new Set(
                dropouts.concat([
                  {
                    participant_number: n,
                    round_dropped_out: round_active,
                  },
                ])
              )
            ),
      };
      updateDoc(docRef, payload);
    }
  };

  return (
    <StyledModal
      header={name}
      subheader="Dropout"
      content={
        <div>
          <p style={{ textAlign: "center" }}>
            Click on a participant to toggle dropout status
          </p>
          <Participants
            round={activeRound}
            roundNumber={group.round_active}
            onToggleDropoutStatus={handleToggleDropoutStatus}
            group={group}
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

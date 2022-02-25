import { Button, Divider, Grid, InputOnChangeData } from "semantic-ui-react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase";
import Participants from "../../pages/group/Participants";
import { getIsRoundDropout, RoundType } from "../../pages/group/utils";
import { groupWithIdType } from "../../types/group";
import StyledModal from "../blocks/StyledModal";
import { ChangeEvent, memo, useState } from "react";
import StyledDropdown from "../blocks/StyledDropdown";

type AdminDropoutModalPropsType = {
  group: groupWithIdType;
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
  const { id, dropouts, active_round_num, name } = group;

  const [roundDroppedOut, setRoundDroppedOut] = useState(active_round_num);
  const handleChangeRoundDroppedOut = (
    e: ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => {
    setRoundDroppedOut(Number(value));
  };

  const handleToggleDropoutStatus = (n: number) => {
    if (n !== 0) {
      const docRef = doc(db, "groups", id);
      const payload = {
        ...group,
        dropouts: getIsRoundDropout({
          nParticipant: n,
          roundNumber: active_round_num,
          dropouts,
        })
          ? dropouts.filter((d) => d.participant_number !== n)
          : Array.from(
              new Set(
                dropouts.concat([
                  {
                    participant_number: n,
                    round_dropped_out: Number(roundDroppedOut),
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
      subheader="Dropout Participant(s)"
      content={
        <div>
          <p style={{ textAlign: "center" }}>
            During which round did the participant(s) drop out?
          </p>
          <StyledDropdown
            onChange={handleChangeRoundDroppedOut}
            value={roundDroppedOut}
            options={(() => {
              let options = [];
              for (let i = 1; i <= active_round_num; i++) {
                options.push({
                  key: i,
                  text: `Round ${
                    i === active_round_num ? i + " (current)" : i
                  }`,
                  value: i,
                });
              }
              return options;
            })()}
            selection
          />
          <Divider hidden clearing />
          <p style={{ textAlign: "center" }}>
            Click on a participant number to{" "}
            <span style={{ fontWeight: "bold" }}>instantly</span> toggle dropout
            status:
          </p>
          <Participants
            round={activeRound}
            roundNumber={active_round_num}
            onToggleDropoutStatus={handleToggleDropoutStatus}
            dropouts={dropouts}
          />
          <Divider hidden />
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

export default memo(AdminDropoutModal);

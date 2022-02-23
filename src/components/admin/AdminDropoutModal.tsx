import {
  Button,
  Divider,
  Form,
  Grid,
  InputOnChangeData,
} from "semantic-ui-react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase";
import Participants from "../../pages/group/Participants";
import { getIsRoundDropout, RoundType } from "../../pages/group/utils";
import { GroupWithIdType } from "../../types/group";
import StyledModal from "../blocks/StyledModal";
import StyledFormInput from "../blocks/StyledFormInput";
import { ChangeEvent, useState } from "react";
import CenterMiddle from "../blocks/CenterMiddle";

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

  const [roundDroppedOut, setRoundDroppedOut] = useState(
    round_active.toString()
  );
  const [roundDroppedOutError, setRoundDroppedOutError] = useState(false);
  const handleChangeRoundDroppedOut = (
    e: ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => {
    const numberValue = Number(value);
    if (
      typeof value === "string" &&
      (!Number.isNaN(numberValue) || value === "")
    ) {
      setRoundDroppedOut(value);

      // Validate
      if (
        Number.isNaN(numberValue) ||
        numberValue < 1 ||
        numberValue > round_active ||
        value.length > 2
      ) {
        if (!roundDroppedOutError) setRoundDroppedOutError(true);
      } else if (roundDroppedOutError) {
        setRoundDroppedOutError(false);
      }
    }
  };

  const handleToggleDropoutStatus = (n: number) => {
    if (n !== 0 && !roundDroppedOutError) {
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
      subheader="Dropout"
      content={
        <div>
          <Form inverted autoComplete="off">
            <Form.Group>
              <StyledFormInput
                name="round_dropped_out"
                placeholder="Round Dropped Out"
                label={
                  <CenterMiddle>{`Round Dropped Out (current: ${round_active})`}</CenterMiddle>
                }
                value={roundDroppedOut}
                onChange={handleChangeRoundDroppedOut}
                error={roundDroppedOutError}
                width={16}
                required
              />
            </Form.Group>
          </Form>
          <Divider hidden />
          <p style={{ textAlign: "center" }}>
            Click on a participant to instantly toggle dropout status
          </p>
          <Participants
            round={activeRound}
            roundNumber={group.round_active}
            onToggleDropoutStatus={handleToggleDropoutStatus}
            group={group}
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

export default AdminDropoutModal;

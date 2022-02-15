import { useState, ChangeEvent } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import {
  Form,
  Button,
  Icon,
  InputOnChangeData,
  Divider,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { db } from "../../firebase";
import { SessionType } from "../../types/session";
import { getMaxRounds } from "../session/utils";

const maxNameLength = 30;
const maxParticipants = 30;

const StyledFormInput = styled(Form.Input)`
  &&&& {
    margin-bottom: 10px;
    input {
      background-color: #1b1c1d;
      color: white;
    }
  }
`;

type NewFormPropsType = { setOpenNewModal: (openNewModal: boolean) => void };
const NewForm = ({ setOpenNewModal }: NewFormPropsType) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const handleChangeName = (
    e: ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => {
    if (typeof value === "string" && value.length <= maxNameLength) {
      setName(value);
    }
  };

  const [participantCount, setParticipantCount] = useState("");
  const handleChangeParticipantCount = (
    e: ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => {
    const numberValue = Number(value);
    if (
      typeof value === "string" &&
      (!Number.isNaN(numberValue) || value === "") &&
      numberValue <= maxParticipants
    ) {
      setParticipantCount(value);
    }
  };

  const maxRounds = getMaxRounds(Number(participantCount));
  const [totalRounds, setTotalRounds] = useState("");
  const handleChangeTotalRounds = (
    e: ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => {
    const numberValue = Number(value);
    if (
      typeof value === "string" &&
      (!Number.isNaN(numberValue) || value === "") &&
      numberValue <= maxRounds
    ) {
      setTotalRounds(value);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async () => {
    setIsSubmitting(true);

    const collectionRef = collection(db, "sessions");

    // TODO: validate all types before submitting
    const payload: SessionType = {
      name,
      participant_count: Number(participantCount),
      active_round: 1,
      total_rounds: Number(totalRounds),
      end_time: Timestamp.now().seconds + 60 * 5,
      is_paused: false,
      paused_remaining_time: 0,
    };

    const docRef = await addDoc(collectionRef, payload);
    navigate(`/session/${docRef.id}`);

    setOpenNewModal(false);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} inverted autoComplete="off">
        <Form.Group>
          <StyledFormInput
            name="name"
            placeholder="Session Name"
            label={`Session Name (max ${maxNameLength})`}
            value={name}
            onChange={handleChangeName}
            required
            width={16}
          />
        </Form.Group>
        <Form.Group>
          <StyledFormInput
            name="participant_count"
            placeholder="Participant Count"
            label={`Participant Count (max ${maxParticipants})`}
            value={participantCount}
            onChange={handleChangeParticipantCount}
            required
            width={8}
          />
          <StyledFormInput
            name="total_rounds"
            placeholder="Total Rounds"
            label={`Total Rounds (max ${maxRounds})`}
            value={totalRounds}
            onChange={handleChangeTotalRounds}
            required
            width={8}
          />
        </Form.Group>
        <Divider hidden />
        <div>
          <Button
            content="Cancel"
            onClick={() => setOpenNewModal(false)}
            floated="left"
          />
          <Button
            disabled={isSubmitting}
            loading={isSubmitting}
            icon
            floated="right"
            labelPosition="right"
            primary
            type="submit"
          >
            Create
            <Icon name="plus" />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NewForm;

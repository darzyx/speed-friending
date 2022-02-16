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
const maxRoundDuration = 60 * 10;
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

type CreateSessionFormPropsType = {
  setOpenCreateSessionModal: (openCreateSessionModal: boolean) => void;
};
const CreateSessionForm = ({
  setOpenCreateSessionModal,
}: CreateSessionFormPropsType) => {
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

  const [roundDuration, setRoundDuration] = useState("300");
  const handleChangeRoundDuration = (
    e: ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => {
    const numberValue = Number(value);
    if (
      typeof value === "string" &&
      (!Number.isNaN(numberValue) || value === "") &&
      numberValue <= maxRoundDuration
    ) {
      setRoundDuration(value);
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
  const [roundCount, setRoundCount] = useState("");
  const handleChangeRoundCount = (
    e: ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => {
    const numberValue = Number(value);
    if (
      typeof value === "string" &&
      (!Number.isNaN(numberValue) || value === "") &&
      numberValue <= maxRounds
    ) {
      setRoundCount(value);
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
      round_count: Number(roundCount),
      end_time: Timestamp.now().seconds + Number(roundDuration),
      is_paused: false,
      paused_remaining_time: 0,
    };

    const docRef = await addDoc(collectionRef, payload);
    navigate(`/session/${docRef.id}`);

    setOpenCreateSessionModal(false);
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
            width={10}
          />
          <StyledFormInput
            name="round_duration"
            placeholder="Round Duration"
            label={`Round Duration (max ${maxRoundDuration})`}
            value={roundDuration}
            onChange={handleChangeRoundDuration}
            required
            width={6}
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
            name="round_count"
            placeholder="Round Count"
            label={`Round Count (max ${maxRounds})`}
            value={roundCount}
            onChange={handleChangeRoundCount}
            required
            width={8}
          />
        </Form.Group>
        <Divider hidden />
        <div>
          <Button
            content="Cancel"
            onClick={() => setOpenCreateSessionModal(false)}
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

export default CreateSessionForm;

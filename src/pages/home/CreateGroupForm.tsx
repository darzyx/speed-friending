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
import { GroupType } from "../../types/group";
import { getMaxRounds } from "../group/utils";

const maxNameLength = 30;
const maxRoundDuration = 60 * 10;
const maxParticipants = 30;

const StyledFormInput = styled(Form.Input)`
  &&&& {
    margin-bottom: 10px;
  }
`;

type CreateGroupFormPropsType = {
  setOpenCreateGroupModal: (openCreateGroupModal: boolean) => void;
};
const CreateGroupForm = ({
  setOpenCreateGroupModal,
}: CreateGroupFormPropsType) => {
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

    const collectionRef = collection(db, "groups");

    // TODO: validate all types before submitting
    const payload: GroupType = {
      name,
      participant_count: Number(participantCount),
      round_count: Number(roundCount),
      round_active: 1,
      round_duration: Number(roundDuration),
      round_end_time: Timestamp.now().seconds + Number(roundDuration),
      round_is_paused: true,
      round_paused_time: Number(roundDuration), // Time remaining when paused
      dropouts: [],
    };

    const docRef = await addDoc(collectionRef, payload);

    setOpenCreateGroupModal(false);
    setIsSubmitting(false);
    navigate(`/group/${docRef.id}`);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Group>
          <StyledFormInput
            name="name"
            placeholder="Group Name"
            label={`Group Name (max ${maxNameLength})`}
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
            onClick={() => setOpenCreateGroupModal(false)}
            floated="left"
            type="button"
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

export default CreateGroupForm;

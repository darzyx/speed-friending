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

import { db } from "../../firebase";
import { groupType } from "../../types/group";
import { getMaxRounds } from "../group/utils";
import StyledFormInput from "../../components/blocks/StyledFormInput";

const maxNameLength = 30;
const maxRoundDuration = 60 * 10;
const maxParticipants = 30;

type CreateGroupFormPropsType = {
  setOpenCreateGroupModal: (openCreateGroupModal: boolean) => void;
};
const CreateGroupForm = ({
  setOpenCreateGroupModal,
}: CreateGroupFormPropsType) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const handleChangeName = (
    e: ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => {
    if (typeof value === "string") {
      setName(value);

      // Validate
      if (value.length < 1 || value.length > maxNameLength) {
        if (!nameError) setNameError(true);
      } else if (nameError) {
        setNameError(false);
      }
    }
  };

  const [participantCount, setParticipantCount] = useState("");
  const [participantCountError, setParticipantCountError] = useState(false);
  const handleChangeParticipantCount = (
    e: ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => {
    const numberValue = Number(value);
    if (
      typeof value === "string" &&
      (!Number.isNaN(numberValue) || value === "")
    ) {
      setParticipantCount(value);

      // Validate
      if (
        Number.isNaN(numberValue) ||
        numberValue < 2 ||
        numberValue > maxParticipants ||
        value.length > 3
      ) {
        if (!participantCountError) setParticipantCountError(true);
      } else if (participantCountError) {
        setParticipantCountError(false);
      }
    }
  };

  const [roundDuration, setRoundDuration] = useState("300");
  const [roundDurationError, setRoundDurationError] = useState(false);
  const handleChangeRoundDuration = (
    e: ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => {
    const numberValue = Number(value);
    if (
      typeof value === "string" &&
      (!Number.isNaN(numberValue) || value === "")
    ) {
      setRoundDuration(value);

      // Validate
      if (
        Number.isNaN(numberValue) ||
        numberValue < 30 ||
        numberValue > maxRoundDuration ||
        value.length > 4
      ) {
        if (!roundDurationError) setRoundDurationError(true);
      } else if (roundDurationError) {
        setRoundDurationError(false);
      }
    }
  };

  const maxRounds = getMaxRounds(Number(participantCount));
  const [roundCount, setRoundCount] = useState("");
  const [roundCountError, setRoundCountError] = useState(false);
  const handleChangeRoundCount = (
    e: ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => {
    const numberValue = Number(value);
    if (
      typeof value === "string" &&
      (!Number.isNaN(numberValue) || value === "")
    ) {
      setRoundCount(value);

      // Validate
      if (
        Number.isNaN(numberValue) ||
        numberValue < 1 ||
        numberValue > maxRounds ||
        value.length > 2
      ) {
        if (!roundCountError) setRoundCountError(true);
      } else if (roundCountError) {
        setRoundCountError(false);
      }
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async () => {
    setIsSubmitting(true);

    // TODO: validate all types before submitting
    const payload: groupType = {
      name,
      participant_count: Number(participantCount),
      active_round_num: 1,
      round_count: Number(roundCount),
      round_duration: Number(roundDuration),
      round_end_time: Timestamp.now().seconds + Number(roundDuration),
      round_is_paused: true,
      round_paused_time: Number(roundDuration), // Time remaining when paused
      dropouts: [],
    };

    const collectionRef = collection(db, "groups");
    const docRef = await addDoc(collectionRef, payload);

    setOpenCreateGroupModal(false);
    setIsSubmitting(false);
    navigate(`/group/${docRef.id}`);
  };

  const hasError =
    nameError || participantCountError || roundDurationError || roundCountError;

  return (
    <div>
      <Form inverted onSubmit={handleSubmit} autoComplete="off">
        <Form.Group>
          <StyledFormInput
            name="name"
            placeholder="Group Name"
            label={`Group Name (max ${maxNameLength})`}
            value={name}
            onChange={handleChangeName}
            required
            width={10}
            error={nameError}
          />
          <StyledFormInput
            name="participant_count"
            placeholder="Participants"
            label={`Participants (max ${maxParticipants})`}
            value={participantCount}
            onChange={handleChangeParticipantCount}
            required
            width={6}
            error={participantCountError}
          />
        </Form.Group>
        <Form.Group>
          <StyledFormInput
            name="round_duration"
            placeholder="Round Duration"
            label={`Round Duration (max ${maxRoundDuration})`}
            value={roundDuration}
            onChange={handleChangeRoundDuration}
            required
            width={8}
            error={roundDurationError}
          />
          <StyledFormInput
            name="round_count"
            placeholder="Round Count"
            label={`Round Count (max ${maxRounds})`}
            value={roundCount}
            onChange={handleChangeRoundCount}
            required
            width={8}
            error={roundCountError}
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
            disabled={isSubmitting || hasError}
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

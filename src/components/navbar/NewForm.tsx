import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { Form, Button, Icon, InputOnChangeData } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import { db } from "../../firebase";
import { SessionType } from "../../types/session";

type NewFormPropsType = { setOpenNewModal: (openNewModal: boolean) => void };
const NewForm = ({ setOpenNewModal }: NewFormPropsType) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const handleChangeName = (
    e: React.ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => {
    if (typeof value === "string") {
      setName(value);
    }
  };

  const [participantCount, setParticipantCount] = useState("");
  const handleChangeParticipantCount = (
    e: React.ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => {
    const numberValue = Number(value);
    if (
      typeof value === "string" &&
      (!Number.isNaN(numberValue) || value === "")
    ) {
      setParticipantCount(value);
    }
  };

  const [totalRounds, setTotalRounds] = useState("");
  const handleChangeTotalRounds = (
    e: React.ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => {
    const numberValue = Number(value);
    if (
      typeof value === "string" &&
      (!Number.isNaN(numberValue) || value === "")
    ) {
      setTotalRounds(value);
    }
  };

  const [password, setPassword] = useState("");
  const handleChangePassword = (
    e: React.ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => {
    if (typeof value === "string") {
      setPassword(value);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async () => {
    setIsSubmitting(true);

    const collectionRef = collection(db, "sessions");

    // TODO: validate types before submitting
    const payload: SessionType = {
      name,
      participant_count: Number(participantCount),
      current_round: 1,
      total_rounds: Number(totalRounds),
    };

    const docRef = await addDoc(collectionRef, payload);
    navigate(`/session/${docRef.id}`);

    setOpenNewModal(false);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} inverted autoComplete="off">
        <Form.Group widths="equal">
          <Form.Input
            name="name"
            placeholder="Session Name"
            label="Session Name"
            value={name}
            onChange={handleChangeName}
          />
          <Form.Input
            name="participant_count"
            placeholder="Number of Participants"
            label="Number of Participants"
            value={participantCount}
            onChange={handleChangeParticipantCount}
          />
          <Form.Input
            name="total_rounds"
            placeholder="Number of Rounds"
            label="Number of Rounds"
            value={totalRounds}
            onChange={handleChangeTotalRounds}
          />
          <Form.Input
            name="password"
            placeholder="Admin Password"
            label="Admin Password"
            value={password}
            onChange={handleChangePassword}
          />
        </Form.Group>
        <div>
          <Button
            content="Cancel"
            onClick={() => setOpenNewModal(false)}
            floated="left"
            basic
            inverted
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

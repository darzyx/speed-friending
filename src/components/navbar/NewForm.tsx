import React, { useCallback, useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { Form, Button, Icon, InputOnChangeData } from "semantic-ui-react";

import { db } from "../../firebase";
import { SessionType } from "../../types/session";

type NewFormPropsType = { setOpenNewModal: (openNewModal: boolean) => void };
const NewForm = ({ setOpenNewModal }: NewFormPropsType) => {
  const [name, setName] = useState("");
  const handleChangeName = (
    e: React.ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => {
    if (typeof value === "string") {
      setName(value);
    }
  };

  const [totalParticipants, setTotalParticipants] = useState("");
  const handleChangeTotalParticipants = (
    e: React.ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => {
    const numberValue = Number(value);
    if (
      typeof value === "string" &&
      (!Number.isNaN(numberValue) || value === "")
    ) {
      setTotalParticipants(value);
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = useCallback(async () => {
    const collectionRef = collection(db, "sessions");

    // TODO: validate types before submitting
    const payload: SessionType = {
      name,
      total_participants: Number(totalParticipants),
      current_round: 0,
      total_rounds: Number(totalRounds),
    };

    await addDoc(collectionRef, payload);

    setOpenNewModal(false);
  }, [name, totalParticipants, totalRounds, setOpenNewModal]);
  useEffect(() => {
    if (isSubmitting) handleSubmit();
  }, [isSubmitting, handleSubmit]);

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
            name="total_participants"
            placeholder="Number of Participants"
            label="Number of Participants"
            value={totalParticipants}
            onChange={handleChangeTotalParticipants}
          />
          <Form.Input
            name="total_rounds"
            placeholder="Number of Rounds"
            label="Number of Rounds"
            value={totalRounds}
            onChange={handleChangeTotalRounds}
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
            onClick={() => setIsSubmitting(true)}
            icon
            floated="right"
            labelPosition="right"
            primary
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

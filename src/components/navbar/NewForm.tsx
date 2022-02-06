import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import {
  Form,
  Button,
  Icon,
  InputOnChangeData,
  Divider,
} from "semantic-ui-react";

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

  const handleSubmit = async () => {
    const id = "KSDHJS7S210SDCQ";
    const docRef = doc(db, "sessions", id);

    // TODO: validate types before submitting
    const payload: SessionType = {
      id,
      name,
      total_participants: Number(totalParticipants),
      current_round: 0,
      total_rounds: Number(totalRounds),
    };

    await setDoc(docRef, payload);

    // Reset values
    setName("");
    setTotalParticipants("");
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
          <Button icon floated="right" labelPosition="right" primary>
            Create
            <Icon name="plus" />
          </Button>
        </div>
      </Form>
      <Divider clearing hidden />
      <strong>onChange:</strong>
      <pre>
        {JSON.stringify({ name, totalParticipants, totalRounds }, null, 2)}
      </pre>
    </div>
  );
};

export default NewForm;

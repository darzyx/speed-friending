import React, { useState } from "react";
import {
  Form,
  Button,
  Icon,
  InputOnChangeData,
  Divider,
} from "semantic-ui-react";
type NewFormPropsType = { setOpenNewModal: (openNewModal: boolean) => void };
const NewForm = ({ setOpenNewModal }: NewFormPropsType) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [submittedNumber, setSubmittedNumber] = useState("");

  const handleSubmit = () => {
    setSubmittedName(name);
    setSubmittedNumber(number);

    // Reset values
    setName("");
    setNumber("");
  };

  const handleChangeName = (
    e: React.ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => {
    setName(value);
  };

  const handleChangeNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => {
    setNumber(value);
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
            name="number"
            placeholder="Number of Participants"
            label="Number of Participants"
            value={number}
            onChange={handleChangeNumber}
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
      <pre>{JSON.stringify({ name, number }, null, 2)}</pre>
      <strong>onSubmit:</strong>
      <pre>{JSON.stringify({ submittedName, submittedNumber }, null, 2)}</pre>
    </div>
  );
};

export default NewForm;

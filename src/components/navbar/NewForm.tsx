import React, { useState } from "react";
import { Form, InputOnChangeData, Divider } from "semantic-ui-react";

const NewForm = () => {
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
      <Form onSubmit={handleSubmit}>
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
        <Form.Button content="Submit" />
      </Form>
      <Divider hidden />
      <div style={{ color: "black" }}>
        <strong>onChange:</strong>
        <pre>{JSON.stringify({ name, number }, null, 2)}</pre>
        <strong>onSubmit:</strong>
        <pre>{JSON.stringify({ submittedName, submittedNumber }, null, 2)}</pre>
      </div>
    </div>
  );
};

export default NewForm;

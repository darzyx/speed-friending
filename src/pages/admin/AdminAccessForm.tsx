import { ChangeEvent, useState } from "react";
import {
  Button,
  Divider,
  Form,
  Grid,
  Icon,
  InputOnChangeData,
  Segment,
} from "semantic-ui-react";

import StyledFormInput from "../../components/blocks/StyledFormInput";
import theme from "../../styles/theme";

const maxUsernameLength = 15;
const testPassword = "brosquito"; // TODO: add real auth logic
const maxPasswordLength = 30;

type AdminAccessFormPropsType = {
  setShowTwitterSignIn: (showTwitterSignIn: boolean) => void;
  inverted: boolean;
};
const AdminAccessForm = ({
  setShowTwitterSignIn,
  inverted,
}: AdminAccessFormPropsType) => {
  const [username, setUsername] = useState("");
  const handleChangeUsername = (
    e: ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => {
    if (typeof value === "string" && value.length <= maxUsernameLength) {
      setUsername(value);
    }
  };

  const [password, setPassword] = useState("");
  const handleChangePassword = (
    e: ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => {
    if (typeof value === "string" && value.length <= maxPasswordLength) {
      setPassword(value);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmitCredentials = async () => {
    if (password === testPassword) {
      setIsSubmitting(true);
      await new Promise(() =>
        setTimeout(() => {
          setShowTwitterSignIn(true);
          setIsSubmitting(false);
        }, 1000)
      );
    }
  };

  return (
    <Segment
      inverted={inverted}
      style={{
        width: "100%",
        maxWidth: "500px",
        color: theme.color.text,
        backgroundColor: theme.color.three,
      }}
    >
      <Form
        onSubmit={handleSubmitCredentials}
        inverted={inverted}
        autoComplete="off"
      >
        <StyledFormInput
          name="username"
          placeholder="Username"
          label="Username"
          value={username}
          onChange={handleChangeUsername}
          type="text"
          required
        />
        <StyledFormInput
          name="password"
          placeholder="Password"
          label="Password"
          value={password}
          onChange={handleChangePassword}
          type="password"
          required
        />
        <Divider hidden />
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column textAlign="center">
              <Button
                disabled={isSubmitting}
                loading={isSubmitting}
                labelPosition="right"
                primary
                type="submit"
                icon
              >
                Sign In
                <Icon name="sign-in" />
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </Segment>
  );
};

export default AdminAccessForm;

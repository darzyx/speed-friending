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

const maxUsernameLength = 30;
const maxPasswordLength = 30;

const SignInForm = () => {
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
  const handleSubmit = () => {
    console.log("SUBMITTING");
    setIsSubmitting(!isSubmitting);
  };

  return (
    <Segment
      inverted
      style={{
        width: "100%",
        maxWidth: "500px",
        color: theme.color.text,
        backgroundColor: theme.color.three,
      }}
    >
      <Form inverted onSubmit={handleSubmit} autoComplete="off">
        <StyledFormInput
          name="username"
          placeholder="Usermame"
          label="Username"
          value={username}
          onChange={handleChangeUsername}
          required
        />
        <StyledFormInput
          name="password"
          placeholder="Password"
          label="Password"
          value={password}
          onChange={handleChangePassword}
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

export default SignInForm;

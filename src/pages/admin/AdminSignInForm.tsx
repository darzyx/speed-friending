import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
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

// TODO: Add real auth logic, new password(s), and remove this
const testPassword = "justvibebro";

const maxPasswordLength = 30;

type AdminSignInFormPropsType = {
  setUserIsAdmin: (userIsAdmin: boolean) => void;
};
const AdminSignInForm = ({ setUserIsAdmin }: AdminSignInFormPropsType) => {
  const navigate = useNavigate();

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
  const handleSubmit = async () => {
    if (password === testPassword) {
      setIsSubmitting(true);
      await new Promise(() =>
        setTimeout(() => {
          setUserIsAdmin(true);
          setIsSubmitting(false);
          navigate("/home");
        }, 1000)
      );
    }
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

export default AdminSignInForm;

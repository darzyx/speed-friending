import {
  TwitterAuthProvider,
  getAuth,
  signInWithRedirect,
  UserCredential,
  getRedirectResult,
} from "firebase/auth";
import { useEffect } from "react";
import { Button } from "semantic-ui-react";
import CenterMiddle from "../../components/blocks/CenterMiddle";

const provider = new TwitterAuthProvider();
const auth = getAuth();

console.log({ auth });

const SignIn = () => {
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        const credential = TwitterAuthProvider.credentialFromResult(
          result as UserCredential
        );
        const token = credential?.accessToken;
        const secret = credential?.secret;
        // ...

        // The signed-in user info.
        const user = result?.user;

        console.log({ token, secret, user });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = TwitterAuthProvider.credentialFromError(error);
        // ...

        console.log({ error, errorCode, errorMessage, email, credential });
      });
  }, []);

  const handleClick = () => {
    signInWithRedirect(auth, provider);
  };

  console.log({ auth });

  return (
    <CenterMiddle>
      <Button onClick={handleClick}>Sign In With Twitter</Button>
    </CenterMiddle>
  );
};

export default SignIn;

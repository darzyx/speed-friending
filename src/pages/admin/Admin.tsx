import { useEffect, useState } from "react";
import {
  // TwitterAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  Auth,
} from "firebase/auth";

import { provider } from "../../firebase";
import CenterMiddle from "../../components/blocks/CenterMiddle";
import { Divider, Header } from "semantic-ui-react";
import AdminAccessForm from "./AdminAccessForm";
import { ColorfulLink } from "../../components/blocks/ColorfulText";
import AdminSignIn from "./AdminSignIn";
import AdminSignOut from "./AdminSignOut";
import AdminSignedOut from "./AdminSignedOut";

type AdminPropsType = {
  auth: Auth;
  userIsAdmin: boolean;
  setUserIsAdmin: (userIsAdmin: boolean) => void;
  inverted: boolean;
};
const Admin = ({
  auth,
  userIsAdmin,
  setUserIsAdmin,
  inverted,
}: AdminPropsType) => {
  // Reset scroll on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showTwitterSignIn, setShowTwitterSignIn] = useState(false);

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
          // You can use these server side with your app's credentials to access the Twitter API.
          // const credential = TwitterAuthProvider.credentialFromResult(result);
          // const token = credential?.accessToken;
          // const secret = credential?.secret;
          // ...
          // The signed-in user info.
          // const user = result.user;
        }
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.email;
        // The AuthCredential type that was used.
        // const credential = TwitterAuthProvider.credentialFromError(error);
        // ...
      });
  }, [auth, setUserIsAdmin]);

  const handleClickSignIn = () => {
    signInWithRedirect(auth, provider);
  };

  const [signedOut, setSignedOut] = useState(false);
  const handleClickSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setSignedOut(true);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <CenterMiddle>
      <Header inverted={inverted} as="h1" textAlign="center">
        <Header.Subheader style={{ margin: "7px" }}>Admin</Header.Subheader>
        Sign In
      </Header>
      {signedOut ? (
        <>
          <Divider hidden />
          <AdminSignedOut />
          <AdminSignIn onClickSignIn={handleClickSignIn} />
        </>
      ) : userIsAdmin ? (
        <>
          <Divider hidden />
          <AdminSignOut onClickSignOut={handleClickSignOut} />
        </>
      ) : showTwitterSignIn ? (
        <>
          <Divider hidden />
          <AdminSignIn onClickSignIn={handleClickSignIn} />
        </>
      ) : (
        <AdminAccessForm
          setShowTwitterSignIn={setShowTwitterSignIn}
          inverted={inverted}
        />
      )}
      <Divider hidden />
      {!userIsAdmin && (
        <CenterMiddle>
          <p style={{ textAlign: "center" }}>Not an administrator?</p>
          <ColorfulLink to="/">Go home to select group &rarr;</ColorfulLink>
        </CenterMiddle>
      )}
    </CenterMiddle>
  );
};

export default Admin;

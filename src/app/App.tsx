import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container, Divider } from "semantic-ui-react";
import { ThemeProvider } from "styled-components";
import useSound from "use-sound";

import Navbar from "../components/navbar/Navbar";
import Home from "../pages/home/Home";
import Group from "../pages/group/Group";
import Admin from "../pages/admin/Admin";
import UserIsAdminAlert from "../components/admin/UserIsAdminAlert";
import { groupsQuery, initGroupWithId } from "./utils";
import GlobalStyles from "../styles/GlobalStyles";
import { darkTheme, lightTheme } from "../styles/theme";
// import AppFooter from "./AppFooter";

// @ts-ignore Cannot find module or its corresponding type declarations.ts(2307)
import startSfx from "../media/start.mp3";
// @ts-ignore Cannot find module or its corresponding type declarations.ts(2307)
import almostSfx from "../media/almost.mp3";
// @ts-ignore Cannot find module or its corresponding type declarations.ts(2307)
import finishSfx from "../media/finish.mp3";

const App = () => {
  const auth = getAuth();
  const currentUserId = auth?.currentUser?.uid;

  const [userIsAdmin, setUserIsAdmin] = useState(Boolean(currentUserId));
  useEffect(() => {
    if (currentUserId) {
      setUserIsAdmin(true);
    } else {
      setUserIsAdmin(false);
    }
  }, [currentUserId]);

  const [anyGroupsExist, setAnyGroupsExist] = useState(false);
  const [isGettingGroups, setIsGettingGroups] = useState(true);
  const [groups, setGroups] = useState([initGroupWithId]);
  const [anyPrivateGroupsExist, setAnyPrivateGroupsExist] = useState(false);
  const [privateGroups, setPrivateGroups] = useState([initGroupWithId]);
  // Returns onSnapshot because its return value terminates the listener
  useEffect(
    () =>
      groupsQuery({
        setGroups,
        setPrivateGroups,
        setAnyGroupsExist,
        setAnyPrivateGroupsExist,
        setIsGettingGroups,
      }),
    []
  );

  const [currentTimeInSeconds, setCurrentTimeInSeconds] = useState(
    Math.floor(Date.now() / 1000)
  );
  const startTime = () => {
    // Unix timestamp in seconds
    setCurrentTimeInSeconds(Math.floor(Date.now() / 1000));
    setTimeout(startTime, 1000);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(startTime, []);

  const [inverted, setInverted] = useState(
    localStorage.getItem("inverted") === "false" ? false : true
  );
  const handleToggleInverted = () => {
    const newInverted = !inverted;
    localStorage.setItem("inverted", newInverted.toString());
    setInverted(newInverted);
  };

  const [mute, setMute] = useState(true);

  const [startReady, setStartReady] = useState(true);
  const [playStartSfx] = useSound(startSfx);
  const playStartSfxIfUnmute = () => {
    if (!mute && startReady) {
      setStartReady(false);
      playStartSfx();
      // Prevent from playing multiple times in quick succession:
      setTimeout(() => setStartReady(true), 5000);
    }
  };

  const [almostReady, setAlmostReady] = useState(true);
  const [playAlmostSfx] = useSound(almostSfx);
  const playAlmostSfxIfUnmute = () => {
    if (!mute && almostReady) {
      setAlmostReady(false);
      playAlmostSfx();
      // Prevent from playing multiple times in quick succession:
      setTimeout(() => setAlmostReady(true), 5000);
    }
  };

  const [finishReady, setFinishReady] = useState(true);
  const [playFinishSfx] = useSound(finishSfx);
  const playFinishSfxIfUnmute = () => {
    if (!mute && finishReady) {
      setFinishReady(false);
      playFinishSfx();
      // Prevent from playing multiple times in quick succession:
      setTimeout(() => setFinishReady(true), 5000);
    }
  };

  return (
    <div className="App" style={{ position: "relative" }}>
      <ThemeProvider theme={inverted ? darkTheme : lightTheme}>
        <GlobalStyles themeStyles={inverted ? darkTheme : lightTheme} />
        <BrowserRouter>
          <UserIsAdminAlert userIsAdmin={userIsAdmin} />
          <Container>
            {userIsAdmin && <Divider hidden />}
            <Navbar
              inverted={inverted}
              handleToggleInverted={handleToggleInverted}
              setMute={setMute}
              mute={mute}
            />
            <Divider hidden />
            <Routes>
              <Route index element={<Navigate to="/home" />} />
              <Route
                path="home"
                element={
                  <Home
                    userIsAdmin={userIsAdmin}
                    isGettingGroups={isGettingGroups}
                    anyGroupsExist={anyGroupsExist}
                    groups={groups}
                    anyPrivateGroupsExist={anyPrivateGroupsExist}
                    privateGroups={privateGroups}
                    currentTimeInSeconds={currentTimeInSeconds}
                    playStartSfxIfUnmute={playStartSfxIfUnmute}
                    playAlmostSfxIfUnmute={playAlmostSfxIfUnmute}
                    playFinishSfxIfUnmute={playFinishSfxIfUnmute}
                    inverted={inverted}
                  />
                }
              />
              <Route
                path="group/:id"
                element={
                  <Group
                    groups={groups}
                    privateGroups={privateGroups}
                    isGettingGroups={isGettingGroups}
                    currentTimeInSeconds={currentTimeInSeconds}
                    userIsAdmin={userIsAdmin}
                    playStartSfxIfUnmute={playStartSfxIfUnmute}
                    playAlmostSfxIfUnmute={playAlmostSfxIfUnmute}
                    playFinishSfxIfUnmute={playFinishSfxIfUnmute}
                    inverted={inverted}
                  />
                }
              />
              <Route
                path="admin"
                element={
                  <Admin
                    auth={auth}
                    userIsAdmin={userIsAdmin}
                    setUserIsAdmin={setUserIsAdmin}
                    inverted={inverted}
                  />
                }
              />
            </Routes>
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
          </Container>
          {/* <AppFooter /> */}
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;

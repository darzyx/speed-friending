import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container, Divider } from "semantic-ui-react";
import { ThemeProvider } from "styled-components";

import Navbar from "../components/navbar/Navbar";
import Home from "../pages/home/Home";
import Group from "../pages/group/Group";
import Admin from "../pages/admin/Admin";
import UserIsAdminAlert from "../components/UserIsAdminAlert";
import { groupsQuery, initGroup } from "./utils";
import GlobalStyles from "../styles/GlobalStyles";
import { darkTheme, lightTheme } from "../styles/theme";

// @ts-ignore 'require' call may be converted to an import.ts(80005)
const alarmOGG = require("../media/alarm.ogg");

const App = () => {
  const auth = getAuth();
  const currentUserId = auth?.currentUser?.uid;

  const [userIsAdmin, setUserIsAdmin] = useState(false);
  useEffect(() => {
    if (currentUserId) {
      setUserIsAdmin(true);
    } else {
      setUserIsAdmin(false);
    }
  }, [currentUserId]);

  const [anyGroupsExist, setAnyGroupsExist] = useState(false);
  const [isGettingGroups, setIsGettingGroups] = useState(true);
  const [groups, setGroups] = useState([initGroup]);
  // Returns onSnapshot because its return value terminates the listener
  useEffect(
    () => groupsQuery({ setGroups, setAnyGroupsExist, setIsGettingGroups }),
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

  const [inverted, setInverted] = useState(true);

  const [muted, setMuted] = useState(true);
  const playAlarmSound = () => {
    if (!muted) {
      const alarm = new Audio(alarmOGG);
      alarm.play();
    }
  };

  return (
    <div className="App">
      <ThemeProvider theme={inverted ? darkTheme : lightTheme}>
        <GlobalStyles themeStyles={inverted ? darkTheme : lightTheme} />
        <BrowserRouter>
          <UserIsAdminAlert userIsAdmin={userIsAdmin} />
          <Container>
            {userIsAdmin && <Divider hidden />}
            <Navbar
              inverted={inverted}
              setInverted={setInverted}
              setMuted={setMuted}
              muted={muted}
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
                    currentTimeInSeconds={currentTimeInSeconds}
                    playAlarmSound={playAlarmSound}
                    inverted={inverted}
                  />
                }
              />
              <Route
                path="group/:id"
                element={
                  <Group
                    groups={groups}
                    isGettingGroups={isGettingGroups}
                    currentTimeInSeconds={currentTimeInSeconds}
                    userIsAdmin={userIsAdmin}
                    playAlarmSound={playAlarmSound}
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
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;

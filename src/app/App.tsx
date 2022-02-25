import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container, Divider, Image } from "semantic-ui-react";
import { ThemeProvider } from "styled-components";

import Navbar from "../components/navbar/Navbar";
import Home from "../pages/home/Home";
import Group from "../pages/group/Group";
import Admin from "../pages/admin/Admin";
import UserIsAdminAlert from "../components/UserIsAdminAlert";
import theme from "../styles/theme";
import imageSVG from "../media/lotus.svg";
import { groupsQuery, initGroup } from "./utils";

const App = () => {
  const auth = getAuth();

  const [userIsAdmin, setUserIsAdmin] = useState(false);
  useEffect(() => {
    // TODO: Logic for setting user as admin
    setUserIsAdmin(false);
  }, []);

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

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <UserIsAdminAlert userIsAdmin={userIsAdmin} />
          <Container>
            {userIsAdmin && <Divider hidden />}
            <Navbar />
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
                  />
                }
              />
            </Routes>
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <Image src={imageSVG} size="tiny" centered />
            <Divider hidden />
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;

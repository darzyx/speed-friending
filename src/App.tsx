import { onSnapshot, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container, Divider, Image } from "semantic-ui-react";
import { ThemeProvider } from "styled-components";

import Navbar from "./components/navbar/Navbar";
import { db } from "./firebase";
import Home from "./pages/home/Home";
import Group from "./pages/group/Group";
import Admin from "./pages/admin/Admin";
import { GroupWithIdType } from "./types/group";
import UserIsAdminAlert from "./components/UserIsAdminAlert";
import theme from "./styles/theme";
import imageSVG from "./media/lotus.svg";

export const initGroup = {
  id: "",
  name: "",
  participant_count: 0,
  round_count: 0,
  round_active: 0,
  round_duration: 0,
  round_end_time: 0,
  round_is_paused: false,
  round_paused_time: 0,
  dropouts: [],
} as GroupWithIdType; // Assumes init data is good!

type GroupsUseStateType = [GroupWithIdType[], (arg: GroupWithIdType[]) => void];

const App = () => {
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  useEffect(() => {
    // TODO: Logic for setting user as admin
    setUserIsAdmin(true);
  }, []);

  const [hasAnyGroups, setHasAnyGroups] = useState(false);
  const [isGettingGroups, setIsGettingGroups] = useState(true);
  const [groups, setGroups]: GroupsUseStateType = useState([initGroup]);
  // Returns onSnapshot because its return value terminates the listener
  useEffect(
    () =>
      onSnapshot(collection(db, "groups"), (snapshot) => {
        let resultGroups = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as GroupWithIdType[]; // Assumes fetched data is good!
        const resultHasAnyGroups =
          Array.isArray(resultGroups) && resultGroups[0]?.name?.length > 0;

        if (resultHasAnyGroups) {
          resultGroups.sort((a, b) => a.name.localeCompare(b.name));
        }

        setGroups(resultGroups);
        setIsGettingGroups(false);
        setHasAnyGroups(resultHasAnyGroups);
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
                    setUserIsAdmin={setUserIsAdmin}
                    isGettingGroups={isGettingGroups}
                    hasAnyGroups={hasAnyGroups}
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

import { onSnapshot, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container, Divider } from "semantic-ui-react";
import Navbar from "./components/navbar/Navbar";

import { db } from "./firebase";
import Home from "./pages/home/Home";
import Session from "./pages/session/Session";
import Admin from "./pages/admin/Admin";
import { SessionWithIdType } from "./types/session";
import UserIsAdminAlert from "./components/UserIsAdminAlert";

export const initSession = {
  id: "",
  name: "",
  participant_count: 0,
  round_count: 0,
  round_active: 0,
  round_duration: 0,
  round_end_time: 0,
  round_is_paused: false,
  round_paused_time: 0,
};

type SessionsUseStateType = [
  SessionWithIdType[],
  (arg: SessionWithIdType[]) => void
];

const App = () => {
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  useEffect(() => {
    // TODO: Logic for setting user as admin
    setUserIsAdmin(false);
  }, []);

  const [hasAnySessions, setHasAnySessions] = useState(false);
  const [isGettingSessions, setIsGettingSessions] = useState(true);
  const [sessions, setSessions]: SessionsUseStateType = useState([initSession]);
  // Returns onSnapshot because its return value terminates the listener
  useEffect(
    () =>
      onSnapshot(collection(db, "sessions"), (snapshot) => {
        let resultSessions = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as SessionWithIdType[]; // Assumes fetched data is good!
        const resultHasAnySessions =
          Array.isArray(resultSessions) && resultSessions[0]?.name?.length > 0;

        if (resultHasAnySessions) {
          resultSessions.sort((a, b) => a.name.localeCompare(b.name));
        }

        setSessions(resultSessions);
        setIsGettingSessions(false);
        setHasAnySessions(resultHasAnySessions);
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
      <UserIsAdminAlert
        userIsAdmin={userIsAdmin}
        setUserIsAdmin={setUserIsAdmin}
      />
      <div className="Main">
        <Container>
          <BrowserRouter>
            <Navbar />
            <Divider hidden />
            <Routes>
              <Route index element={<Navigate to="/home" />} />
              <Route
                path="home"
                element={
                  <Home
                    userIsAdmin={userIsAdmin}
                    isGettingSessions={isGettingSessions}
                    hasAnySessions={hasAnySessions}
                    sessions={sessions}
                    currentTimeInSeconds={currentTimeInSeconds}
                  />
                }
              />
              <Route
                path="session/:id"
                element={
                  <Session
                    sessions={sessions}
                    isGettingSessions={isGettingSessions}
                    currentTimeInSeconds={currentTimeInSeconds}
                    userIsAdmin={userIsAdmin}
                  />
                }
              />
              <Route path="admin" element={<Admin />} />
            </Routes>
            <Divider hidden />
          </BrowserRouter>
        </Container>
      </div>
    </div>
  );
};

export default App;

import { onSnapshot, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Divider } from "semantic-ui-react";
import Navbar from "./components/navbar/Navbar";

import { db } from "./firebase";
import Home from "./pages/Home";
import Session from "./pages/session/Session";
import { SessionWithIdType } from "./types/session";

type SessionsUseStateType = [
  SessionWithIdType[],
  (arg: SessionWithIdType[]) => void
];

export const initSession = {
  id: "",
  name: "",
  total_participants: 0,
  current_round: 0,
  total_rounds: 0,
};

const App = () => {
  const [sessions, setSessions]: SessionsUseStateType = useState([initSession]);
  // Returns onSnapshot because its return value terminates the listener
  useEffect(
    () =>
      onSnapshot(collection(db, "sessions"), (snapshot) => {
        const returnedSessions = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as SessionWithIdType[]; // Assumes fetched data is good
        setSessions(returnedSessions);
      }),
    []
  );

  const [
    userSession,
    // setUserSession
  ] = useState(initSession);

  const [openNewModal, setOpenNewModal] = useState(false);

  return (
    <div className="App">
      <div className="Main">
        <BrowserRouter>
          <Navbar
            userSession={userSession}
            openNewModal={openNewModal}
            setOpenNewModal={setOpenNewModal}
          />
          <Divider hidden />
          <Routes>
            <Route
              index
              element={
                <Home sessions={sessions} setOpenNewModal={setOpenNewModal} />
              }
            />
            <Route
              path="session/:id"
              element={<Session sessions={sessions} />}
            />
          </Routes>
          <Divider hidden />
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;

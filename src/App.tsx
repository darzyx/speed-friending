import { onSnapshot, collection, DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

import { db } from "./firebase";

import Home from "./pages/Home";
import Session from "./pages/session/Session";

// type SessionType = {
//   id: string;
//   name: string;
//   total_participants: number;
//   current_round: number;
//   total_rounds: number;
// };

type SessionsUseStateType = [DocumentData[], (arg: DocumentData[]) => void];

const App = () => {
  const [sessions, setSessions]: SessionsUseStateType = useState([{}]);
  // Returns onSnapshot because return its value terminates listener
  useEffect(
    () =>
      onSnapshot(collection(db, "sessions"), (snapshot) => {
        setSessions(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }),
    []
  );

  return (
    <div className="App">
      <div className="Main">
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route index element={<Home sessions={sessions} />} />
            <Route path="session/:id" element={<Session />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;

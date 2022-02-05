import { onSnapshot, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

import { db } from "./firebase";

import Home from "./pages/Home";
import Session from "./pages/session/Session";

const App = () => {
  const [sessions, setSessions] = useState([{}]);
  console.log({ sessions });

  // Returns onSnapshot because return its value terminates listener
  useEffect(
    () =>
      onSnapshot(collection(db, "sessions"), (snapshot) => {
        setSessions(snapshot.docs.map((doc) => doc.data()));
      }),
    []
  );

  return (
    <div className="App">
      <div className="Main">
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="session" element={<Session />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;

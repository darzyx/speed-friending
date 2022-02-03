import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Session from "./pages/session/Session";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="Main">
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

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

const App = () => {
  return (
    <div className="App">
      <h6>Navbar</h6>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
      <h6>Footer</h6>
    </div>
  );
};

export default App;

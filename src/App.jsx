import Navbar from "./Navbar";
import MainPage from "./assets/pages/MainPage";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Create from "./assets/pages/Create.jsx";

function App() {
  return (
    <Router basename="/reactRouter">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Router>
  );
}

export default App;

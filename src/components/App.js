import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "../contexts/AuthContext";

import Chats from "./Chats";
import Login from "./Login";

function App() {
  return (
    <React.Fragment>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/chats" element={<Chats />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;

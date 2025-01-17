import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/Signup";
import ChatWindow from "./Components/Chatwindow";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/chat" replace />
            ) : (
              <SignIn setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/chat"
          element={isAuthenticated ? <ChatWindow /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;

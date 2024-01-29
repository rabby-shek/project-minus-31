import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
// pages
import Login from "./pages/auth/Login";
import routingPaths from "./routes/routingPaths";

const App = () => {
  const [authToken, setAuthToken] = useState(false);
  const handleLogin = () => {
    setAuthToken(false);
  };

  const handleLogut = () => {
    setAuthToken(true);
  };

  if (authToken) {
    return (
      <>
        <Login handleLogin={handleLogin} />
      </>
    );
  }
  return (
    <>
      <Router>
        <Header handleLogut={handleLogut} />
        <Sidebar />
        <div className="main-container">
          <Routes>
            {routingPaths.map((route) => {
              return (
                <Route
                  key={route.id}
                  path={route.url}
                  element={route.element}
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFoundPage from "./pages/notfound/NotFoundPage";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import AllFoodItem from "./pages/allfooditem/AllFoodItem";
import AddFoodItem from "./pages/addfooditem/AddFoodItem";
import UpdateFoodItem from "./pages/updatefooditem/UpdateFoodItem";
import DailySaleReport from "./pages/dailysalereport/DailySaleReport";
import Login from "./pages/auth/Login";

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
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/all-food-items" element={<AllFoodItem />} />
            <Route path="/add-food-items" element={<AddFoodItem />} />
            <Route path="/update-food-items" element={<UpdateFoodItem />} />
            <Route path="/daily-sale-report" element={<DailySaleReport />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;

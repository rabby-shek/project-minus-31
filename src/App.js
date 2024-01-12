import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFoundPage from "./pages/notfound/NotFoundPage";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import AllFoodItem from "./pages/allfooditem/AllFoodItem";
import AddFoodItem from "./pages/addfooditem/AddFoodItem";
import UpdateFoodItem from "./pages/updatefooditem/UpdateFoodItem";


const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Sidebar />
       <div className="main-container">
       <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/all-food-items" element={<AllFoodItem />} />
          <Route path="/add-food-items" element={<AddFoodItem />} />
          <Route path="/update-food-items" element={<UpdateFoodItem />} />
        </Routes>
       </div>
      </Router>
    </>
  );
};

export default App;

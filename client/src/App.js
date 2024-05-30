import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/Layout/PublicLayout";
import PrivateLayout from "./components/Layout/PrivateLayout";
import Landing from "./pages/Landing/Landing";
import AllPlants from "./pages/AllPlants/AllPlants";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Landing />} />
          <Route exact path="register" element={<Register />} />
          <Route exact path="login" element={<Login />} />
          <Route path="items" element={<AllPlants />} />
        </Route>
        <Route path="/admin" element={<PrivateLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/user" element={<PrivateLayout />}>
          <Route index element={<AllPlants />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/Layout/PublicLayout";
import PrivateLayout from "./components/Layout/PrivateLayout";
import Landing from "./pages/Landing/Landing";
import AllPlants from "./pages/AllPlants/AllPlants";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminSinglePlant from "./pages/SinglePlant/AdminSinglePlant";
import NotFoundPage from "./pages/NotFound/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Landing />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="items" element={<AllPlants />} />
        </Route>
        <Route path="/admin" element={<PrivateLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="items/:id" element={<AdminSinglePlant />} />
        </Route>
        <Route path="/user" element={<PrivateLayout />}>
          <Route index element={<AllPlants />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;

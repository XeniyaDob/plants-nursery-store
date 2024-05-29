import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/Layout/PublicLayout";
import Landing from "./pages/Landing/Landing";
import AllPlants from "./pages/AllPlants/AllPlants";
import AppBar from "../../client/src/components/AppBar/AppBar";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
function App() {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<PublicLayout />} />
        <Route index element={<Landing />} />
        <Route exact path="register" element={<Register />} />
        <Route exact path="login" element={<Login />} />
        <Route path="items" element={<AllPlants />} />
      </Routes>
    </>
  );
}

export default App;

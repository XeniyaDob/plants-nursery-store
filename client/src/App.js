import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/Layout/PublicLayout";
import Landing from "./pages/Landing/Landing";
import AllPlants from "./pages/AllPlants/AllPlants";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicLayout />} />
        <Route index element={<Landing />} />
        <Route path="items" element={<AllPlants />} />
      </Routes>
    </>
  );
}

export default App;

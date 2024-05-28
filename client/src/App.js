import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/Layout/PublicLayout";
import Landing from "./pages/Landing/Landing";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicLayout />} />
        <Route index element={<Landing />} />
      </Routes>
    </>
  );
}

export default App;

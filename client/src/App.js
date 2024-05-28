import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/Layout/PublicLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicLayout />}></Route>
      </Routes>
    </>
  );
}

export default App;

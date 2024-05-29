import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import ButtonAppBarPrivate from "../ButtonAppBar/ButtonAppBarPrivate";

const PrivateLayout = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("plantAppToken");

  if (!isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }
  return (
    <div>
      <ButtonAppBarPrivate />
      <Container>
        <Outlet />
        <main>{children}</main>
      </Container>
    </div>
  );
};

export default PrivateLayout;

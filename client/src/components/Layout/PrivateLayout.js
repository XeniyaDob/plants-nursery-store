import React from "react";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import ButtonAppBarPrivate from "../ButtonAppBar/ButtonAppBarPrivate";

const PrivateLayout = ({ children }) => {
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

import React from "react";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import ButtonAppBarPublic from "../ButtonAppBar/ButtonAppBarPublic";

const PublicLayout = ({ children }) => {
  return (
    <>
      <ButtonAppBarPublic />
      <Container>
        <Outlet />
        <main>{children}</main>
      </Container>
    </>
  );
};
export default PublicLayout;

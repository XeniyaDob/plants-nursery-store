import React from "react";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";

const PublicLayout = ({ children }) => {
  return (
    <>
      <Container>
        <Outlet />
        <main>{children}</main>
      </Container>
    </>
  );
};
export default PublicLayout;

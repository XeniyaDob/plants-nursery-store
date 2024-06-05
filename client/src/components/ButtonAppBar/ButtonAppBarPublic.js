import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import ButtonAppBarPrivate from "./ButtonAppBarPrivate";

export default function ButtonAppBarPublic() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("plantAppUser"));

  const handleSignUpClick = () => {
    navigate("/register");
  };
  return (
    <>
      {currentUser ? (
        <ButtonAppBarPrivate />
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" color="transparent">
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}>
              <Link href="/" underline="none" color="inherit">
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                  Plants Nursery
                </Typography>
              </Link>

              <Link
                onClick={handleSignUpClick}
                underline="none"
                sx={{ cursor: "pointer" }}>
                Sign up
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </>
  );
}

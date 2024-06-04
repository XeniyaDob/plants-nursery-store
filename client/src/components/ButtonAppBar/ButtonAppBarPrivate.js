import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ButtonAppBarPrivate() {
  let navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("plantAppUser"));

  const handleLogout = () => {
    localStorage.removeItem("plantAppToken");
    localStorage.removeItem("plantAppUser");
    navigate("/", { replace: true });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Plants Nursery
          </Typography>
          {currentUser && (
            <Typography variant="h6" component="div">
              {currentUser.name}
            </Typography>
          )}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Link from "@mui/material/Link";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

export default function ButtonAppBarPrivate() {
  let navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("plantAppUser"));

  const handleLogout = () => {
    localStorage.removeItem("plantAppToken");
    localStorage.removeItem("plantAppUser");
    navigate("/", { replace: true });
  };
  const handleCartClick = () => {
    navigate("/user/cart"); // Navigate to the cart page
  };
  return (
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

          {currentUser && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {currentUser.is_admin ? (
                <Link href="/admin" underline="none" color="inherit">
                  <Typography variant="h6" sx={{ m: "0 2rem 0 2rem" }}>
                    dashboard
                  </Typography>
                </Link>
              ) : (
                <Badge badgeContent={10} color="error">
                  <Link
                    underline="none"
                    sx={{ cursor: "pointer" }}
                    onClick={handleCartClick}>
                    <ShoppingBagOutlinedIcon />
                  </Link>
                </Badge>
              )}

              <Typography variant="h6" sx={{ m: "0 2rem 0 2rem" }}>
                {currentUser.name}
              </Typography>
              <Link
                underline="none"
                sx={{ cursor: "pointer" }}
                onClick={handleLogout}>
                Logout
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

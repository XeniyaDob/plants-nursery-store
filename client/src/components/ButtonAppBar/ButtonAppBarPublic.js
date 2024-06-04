import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function ButtonAppBarPublic() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Plants Nursery
          </Typography>
          <Link href="/register" underline="none">
            Sign up
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}>
      <Typography variant="h2" component="h1">
        404
      </Typography>
      <Typography variant="h5" component="h2">
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Oops The page you were looking for doesn't exist.
      </Typography>
      <Link href="/" variant="body1" sx={{ mt: 2 }}>
        Take me home
      </Link>
    </Box>
  );
};

export default NotFound;

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Landing() {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h2">Plant nursery store Landing page</Typography>
      <Typography variant="h5" gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur
      </Typography>
      <Link href="/items" underline="none">
        Explore our plants
      </Link>
    </Box>
  );
}

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import backgroundImage from "../../images/pexels-peterfazekas-1089455.jpg";

export default function Landing() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "3rem",
      }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Box>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
              Explore Our Wide Selection of Plants
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              From rare orchids to vibrant succulents, we've got everything you
              need for your garden.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            href="/items"
            sx={{
              color: "#fff",
              borderColor: "#fff",
            }}>
            Shop Now
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

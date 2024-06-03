import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SinglePlant from "../SinglePlant/SinglePlant";
import Grid from "@mui/material/Grid";

export default function AllPlants() {
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/items")
      .then((response) => {
        setAllItems(response.data.items);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  return (
    <Box sx={{ width: "100%", m: "1rem 0 5rem 0" }}>
      <Typography variant="h2">Explore our plants</Typography>
      {allItems ? (
        <Grid container spacing={1}>
          {allItems.map((item) => (
            <Grid item xs={6}>
              <SinglePlant key={item._id} item={item} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
}

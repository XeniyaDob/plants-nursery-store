import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
    <Box sx={{ width: "100%" }}>
      <Typography variant="h2">GET all plants</Typography>
      <ul>
        {allItems.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </Box>
  );
}

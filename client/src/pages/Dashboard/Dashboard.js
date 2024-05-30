import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import PlantsTable from "./PlantsTable";

export default function Dashboard() {
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
    <Box sx={{ mt: "5rem" }}>
      <PlantsTable allItems={allItems} />
    </Box>
  );
}

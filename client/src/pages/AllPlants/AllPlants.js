import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SinglePlantCard from "../../components/SinglePlantCard/SinglePlantCard";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export default function AllPlants() {
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    axios
      .get("/api/v1/items")
      .then((response) => {
        const sortedItems = response.data.items.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setAllItems(sortedItems);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (itemId) => {
    // add item to cart
    console.log("Adding item to cart:", itemId);
  };

  if (loading) {
    return (
      <Box sx={{ width: "100%", m: "1rem 0 5rem 0" }}>
        <Typography variant="h2">Explore our plants!</Typography>
        <Typography>Loading...</Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ width: "100%", m: "1rem 0 5rem 0" }}>
      <Typography variant="h2">Explore our plants</Typography>
      <Grid container spacing={2}>
        {allItems.map((item) => (
          <Grid item xs={12} md={4} key={item._id}>
            <Box>
              <SinglePlantCard
                key={item._id}
                image={item.image}
                name={item.name}
                description={item.description}
                price={item.price}
                createdAt={item.createdAt}
              />

              <Button onClick={() => handleAddToCart(item._id)}>
                Add to cart
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

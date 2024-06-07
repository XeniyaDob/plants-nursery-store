import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SinglePlantCard from "../../components/SinglePlantCard/SinglePlantCard";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CartPage = () => {
  const [allCartItems, setAllCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const currentUser = JSON.parse(localStorage.getItem("plantAppUser"));
  const token = localStorage.getItem("plantAppToken");

  console.log(allCartItems);
  useEffect(() => {
    axios
      .get("/api/v1/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setAllCartItems(response.data.cartItems);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <Box sx={{ width: "100%", m: "1rem 0 5rem 0" }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ width: "100%", m: "1rem 0 5rem 0" }}>
      <Typography variant="h2">Cart</Typography>
    </Box>
  );
};

export default CartPage;

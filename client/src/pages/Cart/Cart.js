import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const CartPage = () => {
  const [allCartItems, setAllCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
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
    <Container sx={{ mt: "5rem" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Shopping Cart
      </Typography>
      <Grid container spacing={3} sx={{ mt: "5rem" }}>
        {allCartItems.map((cartItem) => (
          <Grid item xs={12} key={cartItem._id}>
            <Paper
              style={{
                padding: "16px",
                display: "flex",
                alignItems: "center",
              }}>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                {cartItem.item.name}
              </Typography>
              <Typography variant="body1" style={{ marginRight: "16px" }}>
                ${cartItem.item.price.toFixed(2)}
              </Typography>

              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="success" style={{ marginTop: "16px" }}>
        Checkout
      </Button>
    </Container>
  );
};

export default CartPage;

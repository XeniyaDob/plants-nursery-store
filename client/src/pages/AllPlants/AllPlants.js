import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SinglePlantCard from "../../components/SinglePlantCard/SinglePlantCard";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select"; // Import Select
import MenuItem from "@mui/material/MenuItem"; // Import MenuItem
import { options } from "../../components/PlantTypeOptions/PlantTypeOptions";
import FormHelperText from "@mui/material/FormHelperText";

export default function AllPlants() {
  const navigate = useNavigate();
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("plantAppUser"));
  const token = localStorage.getItem("plantAppToken");
  useEffect(() => {
    const fetchItems = async () => {
      let url = "/api/v1/items";
      if (searchName || searchType) {
        url += `?name=${encodeURIComponent(searchName)}&type=${searchType}`;
      }

      try {
        const response = await axios.get(url);
        const sortedItems = response.data.items.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setAllItems(sortedItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
        setLoading(false);
      }
    };

    fetchItems();
  }, [searchName, searchType]); // Re-fetch items whenever search params change

  const handleSearchChange = (e, field) => {
    switch (field) {
      case "name":
        setSearchName(e.target.value);
        break;
      case "type":
        setSearchType(e.target.value === "" ? "" : e.target.value); // Reset searchType if "Show All Plants" is selected
        break;
      default:
        break;
    }
  };
  const clearFilters = () => {
    setSearchName("");
    setSearchType("");
  };
  const handleAddToCart = async (itemId, currentUser, token) => {
    const data = { itemId: itemId };

    if (currentUser) {
      try {
        await axios.post(`/api/v1/cart`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Item added to cart successfully:", itemId);

        // navigate("/cart"); // Navigate to the cart page to see the update
      } catch (error) {
        console.error("Failed to add item to cart:", error);
      }
    } else {
      // User is not logged in, navigate to register
      console.log("User not logged in. Redirecting to register page.");
      navigate("/register");
    }
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}>
        <Box sx={{ display: "flex" }}>
          <Box>
            <FormHelperText>Search by Name</FormHelperText>
            <TextField
              value={searchName}
              onChange={(e) => handleSearchChange(e, "name")}
            />
          </Box>
          <Box>
            <FormHelperText>Filter by Type</FormHelperText>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={searchType}
              onChange={(e) => handleSearchChange(e, "type")}
              label="Filter by Type"
              sx={{ width: "10rem" }}>
              <MenuItem value="">Show All Plants</MenuItem>
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <Button
          variant="outlined"
          onClick={clearFilters}
          sx={{ maxHeight: "3rem", color: "black" }}>
          Clear All Filters
        </Button>
      </Box>
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

              <Button
                onClick={() => handleAddToCart(item._id, currentUser, token)}>
                Add to cart
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

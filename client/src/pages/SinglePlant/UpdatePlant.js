import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { options } from "../../components/PlantTypeOptions/PlantTypeOptions";
const defaultTheme = createTheme();

export default function UpdatePlant({ item }) {
  let params = useParams();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    // Populate formData state with item values
    setFormData({
      name: item?.name || "",
      type: item?.type || "",
      price: item?.price || "",
      description: item?.description || "",
    });
  }, [item]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = Object.fromEntries(formData.entries());
    const token = localStorage.getItem("plantAppToken");
    axios
      .patch(`/api/v1/items/${params.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response, "Item updated successfully!");
      })
      .catch((error) => {
        if (error.response.status === 500) {
          setError(true);
          setErrorMessage(
            `${error.response.statusText}, please try again later!`
          );
          return;
        }
        setError(true);
        setErrorMessage(error.response.data.msg);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}>
            <Avatar sx={{ m: 1, backgroundColor: "skyblue" }}>
              <SpaOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Update a plant
            </Typography>
          </Box>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="plant-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label=""
                  variant="filled"
                  color="success"
                  autoFocus
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="filled-select-type"
                  select
                  label="Select"
                  defaultValue={item?.type}
                  name="type"
                  helperText="Please select your plant type"
                  color="success"
                  variant="filled"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }>
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="price"
                  label=""
                  type="price"
                  id="price"
                  autoComplete="price"
                  variant="filled"
                  color="success"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label=""
                  name="description"
                  autoComplete="description"
                  variant="filled"
                  color="success"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            {error && <Typography color="error">{errorMessage}</Typography>}
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}>
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

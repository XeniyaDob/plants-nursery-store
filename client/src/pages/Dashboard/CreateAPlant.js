import React, { useState } from "react";
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

export default function CreateAPlant({ onClose }) {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onInputChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("image", image);

    const data = Object.fromEntries(formData.entries());
    const token = localStorage.getItem("plantAppToken");
    axios
      .post("/api/v1/items", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setSuccessMessage("Item created successfully!");
        onClose();
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
              Create a plant
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
                  label="Plant Name"
                  variant="filled"
                  color="success"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="filled-select-type"
                  select
                  label="Select"
                  defaultValue="trees"
                  name="type"
                  helperText="Please select your plant type"
                  color="success"
                  variant="filled">
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
                  label="Price"
                  type="price"
                  id="price"
                  autoComplete="price"
                  variant="filled"
                  color="success"
                />
              </Grid>
              <Grid item xs={12}>
                <input type="file" accept="image/*" onChange={onInputChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="description"
                  variant="filled"
                  color="success"
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            {error && <Typography color="error">{errorMessage}</Typography>}
            {successMessage && (
              <Box>
                <Typography>{successMessage}</Typography>
              </Box>
            )}
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}>
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

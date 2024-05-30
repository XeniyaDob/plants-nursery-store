import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const defaultTheme = createTheme();

export default function CreateAPlant() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const options = [
    //TODO: add icons
    {
      value: "trees",
    },
    {
      value: "shrubs",
    },
    {
      value: "herbs",
    },
    {
      value: "annuals",
    },
    {
      value: "perennials",
    },
    {
      value: "succulents",
    },

    {
      value: "ferns",
    },
    {
      value: "vines",
    },
    {
      value: "others",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = Object.fromEntries(formData.entries());
    const token = localStorage.getItem("plantAppToken");
    axios
      .post("/api/v1/items", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response, "Item created successfully!");
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a plant
          </Typography>
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

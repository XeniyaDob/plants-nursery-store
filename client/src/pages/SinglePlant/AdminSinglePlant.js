import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import UpdatePlant from "./UpdatePlant";
import Modal from "@mui/material/Modal";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AdminSinglePlant() {
  const [item, setItem] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Success deletion snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  let params = useParams();
  const url = `/api/v1/items/${params.id}`;
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setItem(response.data.item);
      })
      .catch((error) => {
        console.error("Error fetching item:", error);
      });
  }, [url]);

  // Add a delete function
  const handleDelete = () => {
    const token = localStorage.getItem("plantAppToken");
    axios
      .delete(`/api/v1/items/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setSnackbarMessage("Item deleted successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseModal = () => {
    setOpen(false); // Close the modal
    reload();
  };
  const reload = () => window.location.reload();
  return (
    <Box>
      {item ? (
        <Card sx={{ maxWidth: 500, mt: "5rem" }}>
          {item.image ? (
            <CardMedia
              sx={{ height: 400 }}
              image={require(`../../images/${item.image}`)}
              title={item.name}
            />
          ) : null}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description} --- {item.type}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: "1rem", color: "green" }}>
              Price ${item.price}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: "1rem" }}>
              Created at{" "}
              {new Date(item.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleOpen}>
              Update
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
              <Box sx={style}>
                <UpdatePlant item={item} onClose={handleCloseModal} />
              </Box>
            </Modal>
            <Button size="small" onClick={handleDelete}>
              Delete
            </Button>
          </CardActions>
        </Card>
      ) : (
        <Typography>Loading...</Typography>
      )}
      {error && <Typography color="error">{errorMessage}</Typography>}
      {snackbarOpen && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          sx={{ height: "100%" }}>
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}

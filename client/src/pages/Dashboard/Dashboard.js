import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import PlantsTable from "./PlantsTable";
import CreateAPlant from "./CreateAPlant";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

export default function Dashboard() {
  const [allItems, setAllItems] = useState([]);
  const [open, setOpen] = React.useState(false);
  const reload = () => window.location.reload();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseModal = () => {
    setOpen(false); // Close the modal
    reload();
  };
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
      <Button
        variant="contained"
        color="success"
        onClick={handleOpen}
        sx={{ mb: "2rem" }}>
        Add
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <CreateAPlant onClose={handleCloseModal} />
        </Box>
      </Modal>
      <PlantsTable allItems={allItems} />
    </Box>
  );
}

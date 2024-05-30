import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function AdminSinglePlant() {
  let params = useParams();
  const [item, setItem] = useState(null);
  console.log(item);
  useEffect(() => {
    axios
      .get(`/api/v1/items/${params.id}`)
      .then((response) => {
        setItem(response.data.item);
      })
      .catch((error) => {
        console.error("Error fetching item:", error);
      });
  }, []);

  return (
    <Card sx={{ maxWidth: 500, mt: "5rem" }}>
      <CardMedia sx={{ height: 140 }} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: "1rem" }}>
          Price ${item.price}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: "1rem" }}>
          Created at{" "}
          {new Date(item.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Update</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}

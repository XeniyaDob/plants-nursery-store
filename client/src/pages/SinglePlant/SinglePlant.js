import React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function SinglePlant({ item }) {
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
          ) : (
            <CardMedia
              sx={{ height: 400 }}
              image={require(`../../images/no-image.jpeg`)}
              title="no image is available"
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: "1rem" }}>
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
            <Button>Add to cart</Button>
          </CardActions>
        </Card>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
}

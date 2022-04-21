import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function itemCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          src={process.env.PUBLIC_URL + props.image}
          alt="img placeholder"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
          <Typography variant="body3" color="text.secondary">
            £{props.price}
          </Typography>
          <Typography variant="body3" color="text.secondary">
            {props.size}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function itemCard({ items }) {
  return (
    <div className="card-wrapper">
      {items &&
        items.map((item) => (
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                src={process.env.PUBLIC_URL + item.image}
                alt="img placeholder"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Typography variant="body3" color="text.secondary">
                  £{item.price}
                </Typography>
                <Typography variant="body3" color="text.secondary">
                  {item.size}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
    </div>
  );
}

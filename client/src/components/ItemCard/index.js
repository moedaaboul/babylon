import * as React from "react";
import { shadows } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import { width } from "@mui/system";
// import "./ItemCard.css";

export default function itemCard({ items }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {items &&
          items.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
              <Card height="600" sx={{ maxWidth: 345, boxShadow: 2 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="400"
                    src={process.env.PUBLIC_URL + item.image}
                    alt="img placeholder"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      color="text.secondary"
                    >
                      {item.description}
                    </Typography>
                    <Box sx={{ textAlign: "center", fontWeight: "bold" }}>
                      <Typography variant="body3" color="text.secondary">
                        £{item.price}
                      </Typography>
                    </Box>
                    <br></br>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

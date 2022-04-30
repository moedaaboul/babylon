import * as React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CartItem({ data }) {
  return (
    <div>
      <Stack direction="row" spacing={0}>
        <CardMedia
          component="img"
          sx={{ width: 100 }}
          image={data.img}
          alt="Live from space album cover"
        />
        <Item>{data.brandName}</Item>
        <Item>{data.quantity}</Item>
      </Stack>
    </div>
  );
}

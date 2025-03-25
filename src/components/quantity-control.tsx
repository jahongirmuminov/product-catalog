"use client";

import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
}: QuantityControlProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton size="small" onClick={onDecrease} color="primary">
        <RemoveIcon />
      </IconButton>
      <Typography sx={{ mx: 1, minWidth: "20px", textAlign: "center" }}>
        {quantity}
      </Typography>
      <IconButton size="small" onClick={onIncrease} color="primary">
        <AddIcon />
      </IconButton>
    </Box>
  );
}

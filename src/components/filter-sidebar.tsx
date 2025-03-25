"use client";

import type React from "react";

import {
  Box,
  Typography,
  Slider,
  Switch,
  FormControlLabel,
  Paper,
} from "@mui/material";

interface FilterSidebarProps {
  priceRange: [number, number];
  maxPrice: number;
  showOnlyNew: boolean;
  onPriceRangeChange: (newValue: [number, number]) => void;
  onShowOnlyNewChange: (newValue: boolean) => void;
}

export default function FilterSidebar({
  priceRange,
  maxPrice,
  showOnlyNew,
  onPriceRangeChange,
  onShowOnlyNewChange,
}: FilterSidebarProps) {
  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    onPriceRangeChange(newValue as [number, number]);
  };

  const handleNewProductsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onShowOnlyNewChange(event.target.checked);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Typography id="price-range-slider" gutterBottom>
          Price Range
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={maxPrice}
          aria-labelledby="price-range-slider"
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2">${priceRange[0]}</Typography>
          <Typography variant="body2">${priceRange[1]}</Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <FormControlLabel
          control={
            <Switch
              checked={showOnlyNew}
              onChange={handleNewProductsChange}
              color="primary"
            />
          }
          label="Show only new products"
        />
      </Box>
    </Paper>
  );
}

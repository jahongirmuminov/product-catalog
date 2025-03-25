"use client";

import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";

interface SortControlsProps {
  sortOption: string;
  onSortChange: (option: string) => void;
}

export default function SortControls({
  sortOption,
  onSortChange,
}: SortControlsProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onSortChange(event.target.value);
  };

  return (
    <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="sort-select-label">Sort By</InputLabel>
        <Select
          labelId="sort-select-label"
          id="sort-select"
          value={sortOption}
          label="Sort By"
          onChange={handleChange}
        >
          <MenuItem value="nameAsc">Name (A-Z)</MenuItem>
          <MenuItem value="nameDesc">Name (Z-A)</MenuItem>
          <MenuItem value="priceAsc">Price (Low to High)</MenuItem>
          <MenuItem value="priceDesc">Price (High to Low)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

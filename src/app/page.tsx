"use client";

import { useState, useEffect } from "react";
import { Container, Grid, Box } from "@mui/material";

import FilterSidebar from "@/components/filter-sidebar";

import productsData from "@/data/products.json";
import { Product } from "@/types/product";
import SortControls from "@/components/sort-controls";
import ProductList from "@/components/product-list";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<string>("nameAsc");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showOnlyNew, setShowOnlyNew] = useState<boolean>(false);

  useEffect(() => {
    setProducts(productsData);
    setFilteredProducts(productsData);
  }, []);

  useEffect(() => {
    let result = [...products];

    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (showOnlyNew) {
      result = result.filter((product) => product.isNew);
    }

    // Apply sorting
    switch (sortOption) {
      case "nameAsc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameDesc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "priceAsc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [products, sortOption, priceRange, showOnlyNew]);

  const maxPrice = products.length
    ? Math.max(...products.map((product) => product.price))
    : 1000;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <SortControls sortOption={sortOption} onSortChange={setSortOption} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <FilterSidebar
            priceRange={priceRange}
            maxPrice={maxPrice}
            showOnlyNew={showOnlyNew}
            onPriceRangeChange={setPriceRange}
            onShowOnlyNewChange={setShowOnlyNew}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Box sx={{ flexGrow: 1 }}>
            <ProductList products={filteredProducts} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

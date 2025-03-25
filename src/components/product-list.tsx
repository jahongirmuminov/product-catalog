import { Grid } from "@mui/material";
import ProductCard from "./product-card";
import { Product } from "@/types/product";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <Grid container spacing={3}>
      {products.length === 0 ? (
        <Grid item xs={12}>
          <p>No products found matching your criteria.</p>
        </Grid>
      ) : (
        products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))
      )}
    </Grid>
  );
}

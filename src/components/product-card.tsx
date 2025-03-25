"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";

import QuantityControl from "./quantity-control";
import { Product } from "@/types/product";
import { useCart } from "@/context/cart-context";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, removeFromCart, getQuantity } = useCart();
  const quantity = getQuantity(product.id);

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Link
            href={`/product/${product.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="h6" component="div" gutterBottom>
              {product.name}
            </Typography>
          </Link>
          {product.isNew && (
            <Chip label="New" color="success" size="small" sx={{ ml: 1 }} />
          )}
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Brand: {product.brand}
        </Typography>
        <Typography variant="h6" color="primary">
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        {quantity === 0 ? (
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => addToCart(product)}
            fullWidth
          >
            Add to Cart
          </Button>
        ) : (
          <QuantityControl
            quantity={quantity}
            onIncrease={() => addToCart(product)}
            onDecrease={() => removeFromCart(product.id)}
          />
        )}
      </CardActions>
    </Card>
  );
}

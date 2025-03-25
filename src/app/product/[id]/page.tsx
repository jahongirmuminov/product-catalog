"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Container, Typography, Box, Paper, Button } from "@mui/material";
import type { Product } from "@/types/product";
import productsData from "@/data/products.json";
import { useCart } from "@/context/cart-context";
import QuantityControl from "@/components/quantity-control";

export default function ProductPage() {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart, removeFromCart, getQuantity } = useCart();
  const quantity = product ? getQuantity(product.id) : 0;

  useEffect(() => {
    // In a real app, this would be a fetch call to an API
    const foundProduct = productsData.find((p) => p.id === Number(id));
    setProduct(foundProduct || null);
  }, [id]);

  if (!product) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4">Product not found</Typography>
      </Container>
    );
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  const handleIncreaseQuantity = () => {
    if (product) {
      addToCart(product);
    }
  };

  const handleDecreaseQuantity = () => {
    if (product) {
      removeFromCart(product.id);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {product.name}
        </Typography>
        {product.isNew && (
          <Typography
            variant="subtitle1"
            sx={{
              color: "success.main",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            New!
          </Typography>
        )}
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Brand: {product.brand}
        </Typography>
        <Typography variant="h5" color="primary" gutterBottom>
          ${product.price.toFixed(2)}
        </Typography>
        <Box sx={{ my: 3 }}>
          <Typography variant="body1">{product.description}</Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          {quantity === 0 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          ) : (
            <QuantityControl
              quantity={quantity}
              onIncrease={handleIncreaseQuantity}
              onDecrease={handleDecreaseQuantity}
            />
          )}
        </Box>
      </Paper>
    </Container>
  );
}

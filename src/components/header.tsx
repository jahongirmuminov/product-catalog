"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import QuantityControl from "@/components/quantity-control";
import { useCart } from "@/context/cart-context";

export default function Header() {
  const { cart, totalPrice, addToCart, removeFromCart } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ color: "white", textDecoration: "none" }}>
            Product Catalog
          </Link>
        </Typography>
        <IconButton
          color="inherit"
          aria-label="cart"
          onClick={toggleDrawer(true)}
        >
          <Badge badgeContent={totalItems} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 350, p: 2 }} role="presentation">
          <Typography variant="h6" component="div" sx={{ mb: 2 }}>
            Shopping Cart
          </Typography>
          {cart.length === 0 ? (
            <Typography variant="body1">Your cart is empty</Typography>
          ) : (
            <>
              <List>
                {cart.map((item) => (
                  <ListItem key={item.id} sx={{ py: 2 }}>
                    <ListItemText
                      primary={item.name}
                      secondary={`$${item.price.toFixed(2)} each`}
                    />
                    <QuantityControl
                      quantity={item.quantity}
                      onIncrease={() => addToCart(item.product)}
                      onDecrease={() => removeFromCart(item.id)}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2 }}>
                Total: ${totalPrice.toFixed(2)}
              </Typography>
              <Button variant="contained" color="primary" fullWidth>
                Checkout
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
}

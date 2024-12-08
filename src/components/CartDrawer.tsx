import React from "react";
import { Drawer, Box, Typography } from "@mui/material";
import CartItem from "./CartItem"

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cartItems: any[];
  handleIncrement: (productId: number) => void;
  handleDecrement: (productId: number) => void;
  totalPrice: number;
  totalQuantity: number;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  onClose,
  cartItems,
  handleIncrement,
  handleDecrement,
  totalPrice,
  totalQuantity,
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 350,
          padding: "20px",
          borderRadius: "10px 0 0 10px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Box className="p-4">
        <Typography variant="h5" className="text-lg font-bold mb-3 text-center">
        Cart Items
        </Typography>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
              />
            ))}
            {/* Total Price */}
            <Box sx={{ marginTop: 3, display: "flex", justifyContent: "space-between", borderTop: "1px solid #ddd", paddingTop: "12px" }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Total:
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                ${totalPrice.toFixed(2)}
              </Typography>
            </Box>
          </>
        ) : (
          <Typography>Your cart is empty.</Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;

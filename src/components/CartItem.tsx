import React from "react";
import { Box, Button, Typography } from "@mui/material";

interface CartItemProps {
  item: any;
  handleIncrement: (productId: number) => void;
  handleDecrement: (productId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, handleIncrement, handleDecrement }) => {
  return (
    <Box sx={{ marginBottom: 3, display: "flex", alignItems: "center" }}>
      {/* Product Image */}
      <Box sx={{ width: "40%", height: "120px", display: "flex", justifyContent: "center" }}>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: "100%", objectFit: "cover", borderRadius: "8px" }}
        />
      </Box>

      {/* Product Info */}
      <Box sx={{ marginLeft: "12px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: "600", fontSize: "14px", textAlign: "center" }}>
          {item.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "#555", fontSize: "12px", textAlign: "center" }}>
          Price: ${item.price.toFixed(2)}
        </Typography>

        {/* Buttons for Quantity */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", marginTop: 2 }}>
          <Button
            variant="outlined"
            sx={{ padding: "2px 6px", fontSize: "12px", minWidth: "30px" }}
            onClick={() => handleDecrement(item.id)}
          >
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            variant="outlined"
            sx={{ padding: "2px 6px", fontSize: "12px", minWidth: "30px" }}
            onClick={() => handleIncrement(item.id)}
          >
            +
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;

import React, { useState } from "react";
import { FaArrowLeft, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { Box, Button, IconButton, Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CartDrawer from "./CartDrawer";

interface NavbarProps {
  cartItems: any[];
  handleIncrement: (productId: number) => void;
  handleDecrement: (productId: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartItems, handleIncrement, handleDecrement }) => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const buttonTexts = [
    "NEW IN", "SHOP BY", "WOMEN", "MEN", "DESIGNERS", "CLOTHING",
    "SHOES", "BAGS", "ACCESSORIES", "JEWELLERY",
  ];

  const toggleCartDrawer = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  // Calculate total price and quantity using utility functions
  const calculateTotalPrice = (cartItems: any[]) => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const calculateTotalQuantity = (cartItems: any[]) => cartItems.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = calculateTotalPrice(cartItems);
  const totalQuantity = calculateTotalQuantity(cartItems);

  return (
    <nav className="bg-white py-4">
      {/* Button Group */}
      <Box className="flex flex-wrap justify-center gap-5">
        {buttonTexts.map((text, index) => (
          <div key={index}>
            <Button
              variant="text"
              sx={{ textTransform: "none", color: "black", display: "flex", alignItems: "center" }}
            >
              {text}
              <FaChevronDown className="ml-1" />
            </Button>
          </div>
        ))}
      </Box>

      <div className="mt-4" />

      {/* "Men" Button Row */}
      <Box className="flex items-center justify-between p-3 bg-black text-white" sx={{ paddingX: 2 }}>
        <Box sx={{ width: 48 }} />
        <Button
          variant="text"
          color="inherit"
          sx={{ textTransform: "none", alignSelf: "center" }}
          onClick={() => navigate(-1)} // Navigate back to all products
        >
          <FaArrowLeft style={{ marginRight: "5px" }} />
          Men
        </Button>

        {/* Cart Icon Button on Right */}
        <IconButton color="inherit" sx={{ textTransform: "none" }} onClick={toggleCartDrawer}>
          <Badge badgeContent={totalQuantity} color="primary">
            <FaShoppingCart />
          </Badge>
        </IconButton>
      </Box>

      {/* Cart Drawer */}
      <CartDrawer
        open={isCartOpen}
        onClose={toggleCartDrawer}
        cartItems={cartItems}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        totalPrice={totalPrice}
        totalQuantity={totalQuantity}
      />
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import { FaArrowLeft, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { Box, Button, Drawer, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  

  const buttonTexts = [
    "NEW IN",
    "SHOP BY",
    "WOMEN",
    "MEN",
    "DESIGNERS",
    "CLOTHING",
    "SHOES",
    "BAGS",
    "ACCESSORIES",
    "JEWELLERY",
  ];

  const toggleCartDrawer = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  return (
    <nav className="bg-white py-4">
      {/* Button Group */}
      <Box className="flex flex-wrap justify-center gap-5">
        {buttonTexts.map((text, index) => (
          <div key={index}>
            <Button
              variant="text"
              sx={{
                textTransform: "none",
                color: "black",
                display: "flex",
                alignItems: "center",
              }}
            >
              {text}
              <FaChevronDown className="ml-1" />
            </Button>
          </div>
        ))}
      </Box>

      <div className="mt-4" />

      {/* "Men" Button Row */}
      <Box
        className="flex items-center justify-between p-3 bg-black text-white"
        sx={{ paddingX: 2 }}
      >
        {/* Empty Box to Reserve Space on Left */}
        <Box sx={{ width: 48 }} />

        {/* Centered "Men" Button */}
        <Button
          variant="text"
          color="inherit"
          sx={{ textTransform: "none", alignSelf: "center" }}
          onClick={() => navigate(-1)} // Navigate back
        >
          <FaArrowLeft style={{ marginRight: "5px" }} />
          Men
        </Button>

        {/* Cart Icon Button on Right */}
        <IconButton
          color="inherit"
          sx={{ textTransform: "none" }}
          onClick={toggleCartDrawer}
        >
          <FaShoppingCart />
        </IconButton>
      </Box>

      {/* Cart Drawer */}
      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={toggleCartDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: 300,
          },
        }}
      >
        <Box className="p-4">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <p>Your cart is empty.</p>
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;

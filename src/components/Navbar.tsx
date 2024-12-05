import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Button, Box } from "@mui/material";
import { FaChevronDown } from "react-icons/fa";

const Navbar: React.FC = () => {
  const buttonTexts = [
    "NEW IN",
    "SHOP BY",
    "WOMEN",
    "MEN",
    "DESGINERS",
    "CLOTHING",
    "SHOES",
    "BAGS",
    "ACCESSORIES",
    "JEWELLERY",
  ];

  return (
    <nav className="bg-white py-4">
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

      <div className="flex items-center justify-center p-3 bg-black text-white">
        <Button variant="text" color="inherit" sx={{ textTransform: "none" }}>
          <FaArrowLeft style={{marginRight:"5px"}}/>
          Men
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;

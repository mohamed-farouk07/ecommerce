import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Button, Box } from "@mui/material";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Navbar: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate for routing

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
        <Button
          variant="text"
          color="inherit"
          sx={{ textTransform: "none" }}
          onClick={() => navigate(-1)} // This will navigate back to the previous page
        >
          <FaArrowLeft style={{ marginRight: "5px" }} />
          Men
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Box, Button, Typography, Select, MenuItem } from "@mui/material";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { IoGrid } from "react-icons/io5";

const BreadcrumbAndControls: React.FC = () => {
  return (
    <Box sx={{ px: 4, md: { px: 8 }, py: 1 }}>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Breadcrumb */}
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          <a href="/#" className="hover:text-black">
            Home
          </a>{" "}
          /
          <a href="/#" className="hover:text-black">
            {" "}
            Men
          </a>
        </Typography>

        {/* Controls */}
        <Box display="flex" alignItems="center" sx={{ gap: 2 }}>
          {/* View Options */}
          <Box className="hidden sm:flex" sx={{ gap: 1 }}>
            <Button
              variant="outlined"
              sx={{
                borderRadius: 1,
                border: 0,
                padding: 1,
                "&:hover": { backgroundColor: "gray.200" },
              }}
            >
              <IoGrid
                style={{ width: "25px", height: "25px", color: "#000" }}
              />
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderRadius: 1,
                border: 0,
                padding: 1,
                "&:hover": { backgroundColor: "gray.200" },
              }}
            >
              <BsFillGrid3X3GapFill
                style={{ width: "25px", height: "25px", color: "#000" }}
              />
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderRadius: 1,
                border: 0,
                padding: 1,
                "&:hover": { backgroundColor: "gray.200" },
              }}
            >
              <TfiLayoutGrid4Alt
                style={{ width: "25px", height: "25px", color: "#000" }}
              />
            </Button>
          </Box>

          {/* Sort By */}
          <Select
            defaultValue="Sort by latest"
            sx={{
              borderRadius: 1,
              border: "1px solid",
              padding: "4px 12px",
              backgroundColor: "white",
              height: "30px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <MenuItem value="Sort by latest">Sort by latest</MenuItem>
            <MenuItem value="Sort by price">Sort by price</MenuItem>
          </Select>
        </Box>
      </Box>
    </Box>
  );
};

export default BreadcrumbAndControls;

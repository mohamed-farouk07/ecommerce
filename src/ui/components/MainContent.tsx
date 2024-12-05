import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { getAllProducts } from "../../services/productService";

const MainContent: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 6,
        px: 4,
        py: 6,
      }}
    >
      {/* Sidebar */}
      <Box sx={{ width: { xs: "100%", md: "25%" }, mb: 4 }}>
        {/* Product Categories Select */}
        <Box sx={{ borderBottom: 1, pb: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="product-categories-label">
              Product Categories
            </InputLabel>
            <Select
              labelId="product-categories-label"
              id="product-categories"
              defaultValue=""
              sx={{
                textAlign: "left",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              <MenuItem value="category1">Category 1</MenuItem>
              <MenuItem value="category2">Category 2</MenuItem>
              <MenuItem value="category3">Category 3</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Filter by Price Select */}
        <Box sx={{ borderBottom: 1, pb: 2, mt: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="filter-price-label">Filter by Price</InputLabel>
            <Select
              labelId="filter-price-label"
              id="filter-price"
              defaultValue=""
              sx={{
                textAlign: "left",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              <MenuItem value="low-to-high">Low to High</MenuItem>
              <MenuItem value="high-to-low">High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Product Grid */}
      <Box sx={{ flex: 1, p: 2 }}>
        <Grid container spacing={6}>
          {products.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} lg={4}>
              <Card
                sx={{
                  width: 300, // Set a consistent width
                  height: 400, // Set a consistent height
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between", // Distribute content
                  padding: 2, // Add padding inside the card
                  margin: "auto", // Center card if needed
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    width: "200px",
                    height: "200px",
                  }}
                />
                <CardContent
                  sx={{
                    textAlign: "center",
                    flexGrow: 1, // Ensure content fills space evenly
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.category}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" mt={2}>
                    ${product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MainContent;

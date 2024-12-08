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

// Interfaces for type safety
interface Product {
  id: number;
  title: string;
  image: string;
  category: string;
  price: number;
}

interface MainContentProps {
  onProductClick: (productId: number) => void;
}

// Utility Component for Sidebar Filters
const SidebarFilter: React.FC<{
  label: string;
  options: { value: string; label: string }[];
}> = ({ label, options }) => (
  <Box sx={{ borderBottom: 1, pb: 2, mt: 4 }}>
    <FormControl fullWidth>
      <InputLabel id={`${label.toLowerCase().replace(" ", "-")}-label`}>
        {label}
      </InputLabel>
      <Select
        labelId={`${label.toLowerCase().replace(" ", "-")}-label`}
        id={`${label.toLowerCase().replace(" ", "-")}`}
        defaultValue=""
        sx={{
          textAlign: "left",
          fontWeight: "bold",
          color: "#000",
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
);

// Utility Component for Product Card
const ProductCard: React.FC<{
  product: Product;
  onClick: () => void;
}> = ({ product, onClick }) => (
  <Card
    sx={{
      width: 300,
      height: 400,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 2,
      margin: "auto",
      cursor: "pointer",
    }}
    onClick={onClick}
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
        flexGrow: 1,
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
);

const MainContent: React.FC<MainContentProps> = ({ onProductClick }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch Products from API
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

  // Show loading indicator if fetching
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
        <SidebarFilter
          label="Product Categories"
          options={[
            { value: "category1", label: "Category 1" },
            { value: "category2", label: "Category 2" },
            { value: "category3", label: "Category 3" },
          ]}
        />
        <SidebarFilter
          label="Filter by Price"
          options={[
            { value: "low-to-high", label: "Low to High" },
            { value: "high-to-low", label: "High to Low" },
          ]}
        />
      </Box>

      {/* Product Grid */}
      <Box sx={{ flex: 1, p: 2 }}>
        <Grid container spacing={6}>
          {products.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} lg={4}>
              <ProductCard
                product={product}
                onClick={() => onProductClick(product.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MainContent;

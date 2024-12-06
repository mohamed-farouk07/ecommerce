import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  Card,
  CardMedia,
  IconButton,
  Stack,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../services/productService"; // Import the API function
import { ReactComponent as GooglePayLogo } from "../../images/google.svg";
import { ReactComponent as VisaIcon } from "../../images/visa.svg";
import { ReactComponent as MastercardIcon } from "../../images/master-card.svg";
import { ReactComponent as ApplePayIcon } from "../../images/apple-pay.svg";
import { ReactComponent as Maestro } from "../../images/maestro.svg";

const ViewProduct = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getSingleProduct(Number(productId)); // Fetch single product data
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!product) {
    return <Typography>Product not found.</Typography>;
  }

  const icons = [
    { Component: VisaIcon, alt: "Visa" },
    { Component: MastercardIcon, alt: "MasterCard" },
    { Component: ApplePayIcon, alt: "Apple Pay" },
    { Component: Maestro, alt: "Maestro" },
    { Component: GooglePayLogo, alt: "Google Pay" },
  ];
  return (
    <Box sx={{ display: "flex", flexWrap: "nowrap", gap: 4, padding: 4 }}>
      {/* Left Side: Vertical Image Carousel */}
      <Stack direction="column" spacing={2} sx={{ width: "10%" }}>
        {["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg"].map(
          (src, index) => (
            <Card key={index} sx={{ border: "1px solid #ddd", padding: 1 }}>
              <CardMedia
                component="img"
                image={src}
                alt={`Thumbnail ${index + 1}`}
              />
            </Card>
          )
        )}
      </Stack>

      {/* Center: Main Product Image */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "70%", height:"60%",objectFit: "contain" }}
        />
      </Box>

      {/* Right Side: Product Details */}
      <Box
        sx={{ width: "30%", display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Brand Logo */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h6"
            sx={{ textAlign: "center", marginTop: 2 ,fontWeight:"bold"}}
          >
            {product.category}
          </Typography>
        </Box>

        {/* Product Name */}
        <Typography variant="h6" sx={{ color: "gray", textAlign: "center" }}>
          {product.title}
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          ${product.price}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: "center", marginTop: 2 }}>
          {product.description}
        </Typography>

        {/* Size Guide and Dropdown */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", cursor: "pointer" }}
          >
            Size Guide
          </Typography>
          <Select defaultValue="" displayEmpty>
            <MenuItem value="" disabled>
              Choose an option
            </MenuItem>
            <MenuItem value="Size 1">Size 1</MenuItem>
            <MenuItem value="Size 2">Size 2</MenuItem>
            <MenuItem value="Size 3">Size 3</MenuItem>
          </Select>
        </Box>

        {/* Buttons */}
        <Button
          variant="contained"
          sx={{
            width: "100%",
            height: 50,
            color: "#fff",
            backgroundColor: "#000",
          }}
        >
          Add To Cart
        </Button>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            height: 50,
            display: "flex", // Ensures proper alignment of content
            alignItems: "center",
            justifyContent: "center",
            gap: 1, // Adds spacing between the image and text
            backgroundColor: "grey",
          }}
        >
          Pay with
          <GooglePayLogo style={{ width: 70, height: 70 }} />
        </Button>

        {/* Payment Icons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // Center items horizontally
            alignItems: "center", // Center items vertically (optional)
            marginTop: 2,
          }}
        >
          {icons.map(({ Component, alt }, index) => (
            <IconButton key={index} aria-label={alt}>
              <Component style={{ width: 40, height: 40 }} />
            </IconButton>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ViewProduct;

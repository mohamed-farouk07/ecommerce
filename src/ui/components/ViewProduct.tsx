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
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../services/productService";
import { ReactComponent as GooglePayLogo } from "../../images/google.svg";
import { ReactComponent as VisaIcon } from "../../images/visa.svg";
import { ReactComponent as MastercardIcon } from "../../images/master-card.svg";
import { ReactComponent as ApplePayIcon } from "../../images/apple-pay.svg";
import { ReactComponent as Maestro } from "../../images/maestro.svg";

// Define the Product type for better type safety
interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  image: string;
}

interface ViewProductProps {
  addToCart: (product: Product) => void;
}

const ViewProduct: React.FC<ViewProductProps> = ({ addToCart }) => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showQuantityControls, setShowQuantityControls] =
    useState<boolean>(false);

  const paymentIcons = [
    { Component: VisaIcon, alt: "Visa" },
    { Component: MastercardIcon, alt: "MasterCard" },
    { Component: ApplePayIcon, alt: "Apple Pay" },
    { Component: Maestro, alt: "Maestro" },
    { Component: GooglePayLogo, alt: "Google Pay" },
  ];

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        if (productId) {
          const data = await getSingleProduct(Number(productId));
          setProduct(data);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Typography sx={{ textAlign: "center", mt: 4 }}>
        Product not found.
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "nowrap", gap: 4, padding: 4 }}>
      {/* Left Side: Thumbnails */}
      <Thumbnails images={Array(4).fill(product.image)} />

      {/* Center: Main Product Image */}
      <MainProductImage image={product.image} title={product.title} />

      {/* Right Side: Product Details */}
      <ProductDetails
        product={product}
        showQuantityControls={showQuantityControls}
        setShowQuantityControls={setShowQuantityControls}
        addToCart={addToCart}
        paymentIcons={paymentIcons}
      />
    </Box>
  );
};

// Thumbnail component for better reusability
const Thumbnails: React.FC<{ images: string[] }> = ({ images }) => (
  <Stack direction="column" spacing={2} sx={{ width: "10%" }}>
    {images.map((src, index) => (
      <Card key={index} sx={{ border: "1px solid #ddd", padding: 1 }}>
        <CardMedia component="img" image={src} alt={`Thumbnail ${index + 1}`} />
      </Card>
    ))}
  </Stack>
);

// Main Product Image component
const MainProductImage: React.FC<{ image: string; title: string }> = ({
  image,
  title,
}) => (
  <Box
    sx={{
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "start",
    }}
  >
    <img
      src={image}
      alt={title}
      style={{ width: "70%", height: "60%", objectFit: "contain" }}
    />
  </Box>
);

// Product Details component
const ProductDetails: React.FC<{
  product: Product;
  showQuantityControls: boolean;
  setShowQuantityControls: React.Dispatch<React.SetStateAction<boolean>>;
  addToCart: (product: Product) => void;
  paymentIcons: { Component: React.FC; alt: string }[];
}> = ({
  product,
  showQuantityControls,
  setShowQuantityControls,
  addToCart,
  paymentIcons,
}) => (
  <Box sx={{ width: "30%", display: "flex", flexDirection: "column", gap: 2 }}>
    {/* Product Info */}
    <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold" }}>
      {product.category}
    </Typography>
    <Typography variant="h6" sx={{ color: "gray", textAlign: "center" }}>
      {product.title}
    </Typography>
    <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center" }}>
      ${product.price}
    </Typography>
    <Typography variant="body2" sx={{ textAlign: "center" }}>
      {product.description}
    </Typography>

    {/* Size Selection */}
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
        {["Size 1", "Size 2", "Size 3"].map((size) => (
          <MenuItem key={size} value={size}>
            {size}
          </MenuItem>
        ))}
      </Select>
    </Box>

    {/* Add to Cart & Payment Options */}
    {!showQuantityControls ? (
      <Button
        variant="contained"
        sx={{
          width: "100%",
          height: 50,
          color: "#fff",
          backgroundColor: "#000",
        }}
        onClick={() => {
          setShowQuantityControls(true);
          addToCart(product);
        }}
      >
        Add To Cart
      </Button>
    ) : (
      <Typography variant="body2" textAlign="center">
        Quantity controls would appear here.
      </Typography>
    )}

    <Button
      variant="contained"
      sx={{
        width: "100%",
        height: 50,
        backgroundColor: "grey",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      Pay with
      <GooglePayLogo style={{ width: 70, height: 70 }} />
    </Button>

    {/* Payment Icons */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 2,
      }}
    >
      {paymentIcons.map(({ Component, alt }, index) => (
        <IconButton key={index} aria-label={alt}>
          <Box component={Component} sx={{ width: 40, height: 40 }} />
        </IconButton>
      ))}
    </Box>
  </Box>
);

export default ViewProduct;

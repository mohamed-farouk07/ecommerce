import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./ui/components/ViewProduct";
import Navbar from "./components/Navbar";
import BreadcrumbAndControls from "./components/BreadcrumbAndControls";
import "./App.css";

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const handleIncrement = (productId: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (productId: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const addToCart = (product: any) => {
    setCartItems((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);
      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <div className="App">
      <Navbar
        cartItems={cartItems}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />
      <BreadcrumbAndControls />
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route
          path="/product/:productId"
          element={<ProductDetailPage addToCart={addToCart} />}
        />
      </Routes>
    </div>
  );
};

export default App;

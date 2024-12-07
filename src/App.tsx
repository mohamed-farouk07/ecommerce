import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./ui/components/ViewProduct";
import Navbar from './components/Navbar';
import BreadcrumbAndControls from './components/BreadcrumbAndControls'; 
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <BreadcrumbAndControls />
      
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;

import React from "react";
import { useNavigate } from "react-router-dom";
import MainContent from '../ui/components/MainContent';

const ProductPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">

      {/* Main Content */}
      <MainContent onProductClick={(productId: number) => navigate(`/product/${productId}`)} />

      {/* Sticky Button */}
      <button className="fixed bottom-4 left-4 bg-black text-white text-sm p-4 rounded-full shadow-lg">
        Get 5% OFF
      </button>
    </div>
  );
};

export default ProductPage;

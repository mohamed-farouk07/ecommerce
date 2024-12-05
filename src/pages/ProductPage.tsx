import React from "react";

import Navbar from '../components/Navbar';
import BreadcrumbAndControls from '../components/BreadcrumbAndControls';
import MainContent from '../ui/components/MainContent';

const ProductPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
    {/* Navbar */}
    <Navbar />

    {/* Breadcrumb and Controls */}
    <BreadcrumbAndControls />

    {/* Main Content */}
    <MainContent />

    {/* Sticky Button */}
    <button className="fixed bottom-4 left-4 bg-black text-white text-sm p-4 rounded-full shadow-lg">
      Get 5% OFF
    </button>
  </div>
  );
};

export default ProductPage;

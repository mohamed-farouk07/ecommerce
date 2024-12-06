import axios from 'axios';

const GetProducts = 'https://fakestoreapi.com/products';

export const getAllProducts = async () => {
  try {
    const response = await axios.get(GetProducts);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getSingleProduct = async (productId: number) => {
  try {
    const response = await axios.get(`${GetProducts}/${productId}`); // Corrected URL
    console.log("Product Data:", response.data); // Log the product data to the console
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};


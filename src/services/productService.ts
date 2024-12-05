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

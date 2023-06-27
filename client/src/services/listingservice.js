import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/craft';

export const getAllCategories = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error retrieving categories');
  }
};

export const getCraftsByCategory = async (category, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/category/${category}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch crafts for category: ${category}`);
  }
};

export const createCraft = async (craftData, token) => {
  try {
    const response = await axios.post(`${BASE_URL}`, craftData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create craft');
  }
};

export const deleteListing = async (craftId, token) => {
  try {
    await axios.delete(`${BASE_URL}/${craftId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error('Failed to delete listing');
  }
};

export const getCurrentUser = async (token) => {
  try {
    const response = await axios.get('http://localhost:8000/api/auth/current', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    console.error(error);
    return null; 
  }
};

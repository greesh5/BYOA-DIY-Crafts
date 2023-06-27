import React, { useEffect, useState } from 'react';
import { Link, useHistory, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { getAllCategories, getCraftsByCategory, createCraft, getCurrentUser } from '../../services/listingservice';
import { useAuth } from '../../context/authcontext';
import './listingpage.css';

function ListingPage() {
  const { isAuthenticated, logout, token } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories(token);
        console.log(token);
        setCategories(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUserRole = async () => {
      try {
        const user = await getCurrentUser(token);
        console.log(user);
        setUserRole(user?.role);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
    fetchUserRole();
  },[token]);

  const handleCategoryClick = async (category) => {
    try {
      const crafts = await getCraftsByCategory(category, token);
      console.log(crafts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateCraft = () => {
    navigate('/createcraft');
  };

  const renderDeleteButton = () => {
    if (userRole === 'admin') {
      return (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCreateCraft}
          style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        >
          Add Craft
        </Button>
      );
    }
    return null;
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <div className="categories">
                <h1 className="name">Categories:</h1>
                <ul>
                  {categories.map((category) => (
                    <li key={category}>
                      <Link
                        to={`/crafts/${category}`}
                        className="category-link"
                        onClick={() => handleCategoryClick(category)}
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Please log in to access the Listing Page.</p>
      )}
      {renderDeleteButton()}
    </div>
  );
}

export default ListingPage;

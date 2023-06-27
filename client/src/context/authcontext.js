import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const API_BASE_URL = 'http://localhost:8000/api/auth';

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [errors, setErrors] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    const storeToken = (token) => {
      localStorage.setItem('token', token);
    };
  
    const clearToken = () => {
      localStorage.removeItem('token');
    };
  
    const login = async (email, password) => {
      try {
        const response = await fetch(`${API_BASE_URL}/login`, {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          const data = await response.json();
          const { token } = data;
  
          setToken(token);
          setCurrentUser(email);
          setIsAuthenticated(true);
  
          // Store the token in local storage
          storeToken(token);
          
          navigate('/listings');
          alert("login successful")
        } else {
          const errorData = await response.json();
          const { message } = errorData;
  
          if (response.status === 400 && message === 'Email is not registered') {
            setErrors('Email is not registered. Please try again.');
          } else {
            setErrors('Email is not registered. Please signup.');
          }
        }
      } catch (error) {
        setErrors('An error occurred during login. Please try again.');
      }
      setIsSubmitting(false);
    };
  
    const logout = () => {
      clearToken();
      setCurrentUser(null);
      setIsAuthenticated(false);
      navigate('/login');
    };
  
    const signup = async (name, email, password) => {
      try {
        const response = await fetch(`${API_BASE_URL}/signup`, {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          const data = await response.json();
          const { token } = data;
  
          setToken(token);
          setCurrentUser(email);
  
          // Store the token in local storage
          storeToken(token);
          navigate('/login');
          alert("signup Successful")
        } else {
          const errorData = await response.json();
          const { message } = errorData;
  
          if (response.status === 409 && message === 'Email is already registered') {
            setErrors('Email is already registered. Please log in.');
          } else {
            setErrors('Email is already registered. Please log in.');
          }
        }
      } catch (error) {
        setErrors('Error occurred during signup. Please try again.');
      }
      setIsSubmitting(false);
    };
  
    useEffect(() => {
      const storedToken = localStorage.getItem('token');
  
      if (storedToken) {
        // Token exists in local storage, set it in the state
        setToken(storedToken);
        setIsAuthenticated(true);
      }
    }, []);
  
    const value = {
      setLoggedIn,
      currentUser,
      isAuthenticated,
      users,
      setUsers,
      loggedIn,
      errors,
      setErrors,
      setIsSubmitting,
      logout,
      login,
      token,
      signup,
    };
  
    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
  };
  const useAuth = () => useContext(AuthContext);

  export { AuthProvider, useAuth };  
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authcontext";
import { useNavigate } from 'react-router-dom';
import "./signup.css";

const SignupForm = () => {
  const { signup, setErrors, setIsSubmitting, token, errors } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await signup(name, email, password);
    } catch (errors) {
      setErrors('Error occurred during signup. Please try again.');
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
        {errors && <p className="error">{errors}</p>}
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default SignupForm;
